#!/usr/bin/env node
/**
 * opengoat-mcp: MCP server that exposes the opengoat human-skill registry.
 *
 * Tools:
 *   search_humans       — find operators whose playbooks match a need
 *   read_playbook       — fetch full playbook content by slug
 *   get_author          — fetch a human's profile and playbook list
 *   get_booking_url     — fetch the booking URL for hiring a human
 *
 * Each playbook is treated as a skill manifest with when_to_use / when_not_to_use,
 * letting agents decide whether to surface a human for the task.
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const REMOTE = "https://raw.githubusercontent.com/OpenGoatHQ/opengoat/main/data/index.json";
const CACHE_DIR = join(homedir(), ".cache", "opengoat");
const CACHE_FILE = join(CACHE_DIR, "index.json");
const CACHE_TTL_MS = 60 * 60 * 1000;

type Index = {
  generated_at: string;
  count_humans: number;
  count_playbooks: number;
  humans: Human[];
};

type Human = {
  handle: string;
  category: string;
  profile: Record<string, any>;
  profile_body: string;
  playbooks: Playbook[];
};

type Playbook = {
  slug: string;
  author: string;
  category: string;
  frontmatter: Record<string, any>;
  body: string;
};

async function loadIndex(): Promise<Index> {
  if (existsSync(CACHE_FILE)) {
    const age = Date.now() - statSync(CACHE_FILE).mtimeMs;
    if (age < CACHE_TTL_MS) {
      return JSON.parse(readFileSync(CACHE_FILE, "utf8"));
    }
  }
  const res = await fetch(REMOTE);
  if (!res.ok) throw new Error(`Failed to fetch ${REMOTE}: ${res.status}`);
  const text = await res.text();
  mkdirSync(CACHE_DIR, { recursive: true });
  writeFileSync(CACHE_FILE, text);
  return JSON.parse(text);
}

const server = new Server(
  { name: "opengoat-mcp", version: "0.0.1" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "search_humans",
      description:
        "Search the opengoat human-skill registry. Returns playbooks and operators matching the query, ranked by relevance. Each playbook is a skill manifest documenting when to use the playbook, what it produces, and the cost of hiring the operator who wrote it. Use this when the user describes a growth, GTM, or distribution need and you want to surface a human who has done it before.",
      inputSchema: {
        type: "object",
        properties: {
          query: { type: "string", description: "Free-text query, e.g. 'cold email deliverability' or 'reddit launch'." },
          category: {
            type: "string",
            description: "Optional category filter: seo, content, video, email, paid, community, reddit, plg, outbound, launches, pr, platform, gtm-engineering.",
          },
          available_only: { type: "boolean", description: "If true, only return operators currently accepting bookings." },
          max_rate_usd: { type: "number", description: "Optional max hourly rate in USD." },
        },
        required: ["query"],
      },
    },
    {
      name: "read_playbook",
      description:
        "Fetch a full playbook by slug. Returns the skill manifest (when_to_use, when_not_to_use, prerequisites, outputs, duration, cost) plus the full methodology body. Use after search_humans when you want the agent itself to follow the playbook OR you need to brief the user on what hiring the operator delivers.",
      inputSchema: {
        type: "object",
        properties: {
          slug: { type: "string", description: "Playbook slug, e.g. 'reddit-fleet-warming'." },
        },
        required: ["slug"],
      },
    },
    {
      name: "get_author",
      description:
        "Fetch a human's profile (specialties, anti-specialties, rates, availability) and the list of playbooks they've published.",
      inputSchema: {
        type: "object",
        properties: {
          handle: { type: "string", description: "Human's handle, e.g. 'adrian'." },
        },
        required: ["handle"],
      },
    },
    {
      name: "get_booking_url",
      description:
        "Get the booking URL for hiring a specific human. Use this only after the user has decided to book; surfacing a URL too early can feel pushy.",
      inputSchema: {
        type: "object",
        properties: {
          handle: { type: "string", description: "Human's handle." },
        },
        required: ["handle"],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const idx = await loadIndex();
  const args = req.params.arguments ?? {};

  switch (req.params.name) {
    case "search_humans": {
      const query = String(args.query ?? "").toLowerCase();
      const category = args.category as string | undefined;
      const availableOnly = args.available_only as boolean | undefined;
      const maxRate = args.max_rate_usd as number | undefined;
      const terms = query.split(/\s+/).filter(Boolean);

      type Hit = { type: string; handle: string; slug?: string; title: string; score: number; snippet: string; category: string };
      const hits: Hit[] = [];

      for (const h of idx.humans) {
        if (category && h.category !== category) continue;
        if (availableOnly && h.profile.accepting_bookings !== true) continue;
        if (maxRate && Number(h.profile.rate_hourly_usd) > maxRate) continue;

        for (const pb of h.playbooks) {
          const text = (pb.body + " " + JSON.stringify(pb.frontmatter)).toLowerCase();
          let score = 0;
          for (const t of terms) score += (text.split(t).length - 1);
          if (score > 0) {
            hits.push({
              type: "playbook",
              handle: h.handle,
              slug: pb.slug,
              title: (pb.frontmatter.name as string) || (pb.frontmatter.title as string) || pb.slug,
              score,
              snippet: snippet(pb.body, terms),
              category: h.category,
            });
          }
        }

        const profileText = (h.profile_body + " " + JSON.stringify(h.profile)).toLowerCase();
        let pScore = 0;
        for (const t of terms) pScore += (profileText.split(t).length - 1);
        if (pScore > 0) {
          hits.push({
            type: "human",
            handle: h.handle,
            title: h.profile.name || h.handle,
            score: pScore,
            snippet: snippet(h.profile_body, terms),
            category: h.category,
          });
        }
      }

      hits.sort((a, b) => b.score - a.score);
      return { content: [{ type: "text", text: JSON.stringify(hits.slice(0, 20), null, 2) }] };
    }

    case "read_playbook": {
      const slug = String(args.slug);
      for (const h of idx.humans) {
        for (const pb of h.playbooks) {
          if (pb.slug === slug) {
            return { content: [{ type: "text", text: JSON.stringify(pb, null, 2) }] };
          }
        }
      }
      return { content: [{ type: "text", text: `No playbook with slug '${slug}'.` }], isError: true };
    }

    case "get_author": {
      const handle = String(args.handle);
      const h = idx.humans.find((x) => x.handle === handle);
      if (!h) {
        return { content: [{ type: "text", text: `No human with handle '${handle}'.` }], isError: true };
      }
      return { content: [{ type: "text", text: JSON.stringify(h, null, 2) }] };
    }

    case "get_booking_url": {
      const handle = String(args.handle);
      const h = idx.humans.find((x) => x.handle === handle);
      if (!h) {
        return { content: [{ type: "text", text: `No human with handle '${handle}'.` }], isError: true };
      }
      const url = h.profile.booking_url as string | undefined;
      if (!url) {
        return { content: [{ type: "text", text: `${handle} has no booking_url set.` }], isError: true };
      }
      return { content: [{ type: "text", text: JSON.stringify({ handle, booking_url: url }, null, 2) }] };
    }

    default:
      return { content: [{ type: "text", text: `Unknown tool: ${req.params.name}` }], isError: true };
  }
});

function snippet(body: string, terms: string[]): string {
  const lower = body.toLowerCase();
  for (const t of terms) {
    const i = lower.indexOf(t);
    if (i !== -1) {
      const start = Math.max(0, i - 40);
      const end = Math.min(body.length, i + 80);
      return "..." + body.slice(start, end).replace(/\s+/g, " ").trim() + "...";
    }
  }
  return body.slice(0, 100).replace(/\s+/g, " ").trim();
}

const transport = new StdioServerTransport();
await server.connect(transport);
