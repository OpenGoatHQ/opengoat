#!/usr/bin/env node
/**
 * opengoat-mcp: MCP server exposing the opengoat registry.
 *
 * The registry is a graph of three entity types: humans, agents, skills.
 * Every entity is queryable. Skills point to providers (MOATT, orthogonal,
 * MCP, custom HTTP) for execution. Humans and agents are bookable.
 *
 * Tools:
 *   search          — query across all 3 entity types
 *   get_human       — profile + goat.md + authored skills
 *   get_agent       — profile + goat.md + authored skills
 *   read_skill      — full skill manifest with provider implementations
 *   get_booking_url — fetch booking URL for a human
 *
 * Decision logic: agents read get_human/get_agent goat.md content to decide
 * whether to surface a human/agent for hire vs. run a skill standalone.
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
  schema_version?: string;
  count_humans: number;
  count_agents: number;
  count_skills: number;
  humans: Profile[];
  agents: Profile[];
  skills: Skill[];
};

type Profile = {
  handle: string;
  category: string;
  profile: Record<string, any>;
  profile_body: string;
  goat: { frontmatter: Record<string, any>; body: string } | null;
};

type Skill = {
  slug: string;
  frontmatter: Record<string, any>;
  body: string;
};

async function loadIndex(): Promise<Index> {
  if (existsSync(CACHE_FILE)) {
    const age = Date.now() - statSync(CACHE_FILE).mtimeMs;
    if (age < CACHE_TTL_MS) return JSON.parse(readFileSync(CACHE_FILE, "utf8"));
  }
  const res = await fetch(REMOTE);
  if (!res.ok) throw new Error(`Failed to fetch ${REMOTE}: ${res.status}`);
  const text = await res.text();
  mkdirSync(CACHE_DIR, { recursive: true });
  writeFileSync(CACHE_FILE, text);
  return JSON.parse(text);
}

const server = new Server(
  { name: "opengoat-mcp", version: "0.0.2" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "search",
      description:
        "Search the opengoat registry across humans, agents, and skills. Use when the user describes a need (growth, GTM, distribution, technical) and you want to surface options. Returns ranked hits with snippets.",
      inputSchema: {
        type: "object",
        properties: {
          query: { type: "string", description: "Free-text query, e.g. 'cold email deliverability'." },
          type: { type: "string", enum: ["human", "agent", "skill"], description: "Optional filter by entity type." },
          category: { type: "string", description: "Optional filter by one of: seo, content, video, email, paid, community, reddit, plg, outbound, launches, pr, platform, gtm-engineering." },
          available_only: { type: "boolean", description: "For humans/agents: only entities accepting work." },
          max_rate_usd: { type: "number", description: "For humans: max hourly rate USD." },
        },
        required: ["query"],
      },
    },
    {
      name: "get_human",
      description:
        "Fetch a human's full profile (rates, specialties, anti-specialties, booking URL), their goat.md (where AI fails in their domain + what they add beyond skills), and the skills they authored. Use this to decide whether to surface a human for hire.",
      inputSchema: {
        type: "object",
        properties: { handle: { type: "string", description: "Human's handle." } },
        required: ["handle"],
      },
    },
    {
      name: "get_agent",
      description:
        "Fetch an agent's full profile (capabilities, builder, runtime endpoint, price per call, latency, success rate), its goat.md (failure modes, when not to use), and skills it implements. Use this when the agent could automate the task.",
      inputSchema: {
        type: "object",
        properties: { handle: { type: "string", description: "Agent's handle." } },
        required: ["handle"],
      },
    },
    {
      name: "read_skill",
      description:
        "Fetch a full skill manifest by slug. Returns when_to_use, when_not_to_use, prerequisites, outputs, duration, cost, and the implementations array (providers like MOATT, orthogonal, MCP, custom HTTP). The methodology body explains the spec; the providers explain how to run it.",
      inputSchema: {
        type: "object",
        properties: { slug: { type: "string", description: "Skill slug, e.g. 'cold-email-domain-warming'." } },
        required: ["slug"],
      },
    },
    {
      name: "get_booking_url",
      description:
        "Get the booking URL for hiring a human. Use after the user has signaled hiring intent. opengoat takes 0% on bookings; the URL is the human's own Cal.com or equivalent.",
      inputSchema: {
        type: "object",
        properties: { handle: { type: "string", description: "Human's handle." } },
        required: ["handle"],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const idx = await loadIndex();
  const args = req.params.arguments ?? {};

  switch (req.params.name) {
    case "search": {
      const query = String(args.query ?? "").toLowerCase();
      const type = args.type as string | undefined;
      const category = args.category as string | undefined;
      const availableOnly = args.available_only as boolean | undefined;
      const maxRate = args.max_rate_usd as number | undefined;
      const terms = query.split(/\s+/).filter(Boolean);

      type Hit = {
        type: "human" | "agent" | "skill";
        handle?: string;
        slug?: string;
        title: string;
        score: number;
        snippet: string;
        category?: string;
      };
      const hits: Hit[] = [];

      function score(text: string): number {
        let n = 0;
        for (const t of terms) n += text.split(t).length - 1;
        return n;
      }

      if (!type || type === "human") {
        for (const h of idx.humans) {
          if (category && h.category !== category) continue;
          if (availableOnly && h.profile.accepting_bookings !== true) continue;
          if (maxRate && Number(h.profile.rate_hourly_usd) > maxRate) continue;
          const text = (h.profile_body + " " + JSON.stringify(h.profile) + " " + (h.goat?.body ?? "")).toLowerCase();
          const sc = score(text);
          if (sc > 0) {
            hits.push({
              type: "human",
              handle: h.handle,
              title: (h.profile.name as string) || h.handle,
              score: sc,
              snippet: snippet(h.profile_body, terms),
              category: h.category,
            });
          }
        }
      }

      if (!type || type === "agent") {
        for (const a of idx.agents) {
          if (category && a.category !== category) continue;
          if (availableOnly && a.profile.accepting_calls !== true) continue;
          const text = (a.profile_body + " " + JSON.stringify(a.profile) + " " + (a.goat?.body ?? "")).toLowerCase();
          const sc = score(text);
          if (sc > 0) {
            hits.push({
              type: "agent",
              handle: a.handle,
              title: (a.profile.name as string) || a.handle,
              score: sc,
              snippet: snippet(a.profile_body, terms),
              category: a.category,
            });
          }
        }
      }

      if (!type || type === "skill") {
        for (const s of idx.skills) {
          if (category && s.frontmatter.category !== category) continue;
          const text = (s.body + " " + JSON.stringify(s.frontmatter)).toLowerCase();
          const sc = score(text);
          if (sc > 0) {
            hits.push({
              type: "skill",
              slug: s.slug,
              title: (s.frontmatter.name as string) || s.slug,
              score: sc,
              snippet: snippet(s.body, terms),
              category: s.frontmatter.category as string,
            });
          }
        }
      }

      hits.sort((a, b) => b.score - a.score);
      return { content: [{ type: "text", text: JSON.stringify(hits.slice(0, 20), null, 2) }] };
    }

    case "get_human": {
      const handle = String(args.handle);
      const h = idx.humans.find((x) => x.handle === handle);
      if (!h) return { content: [{ type: "text", text: `No human with handle '${handle}'.` }], isError: true };
      const skills = idx.skills.filter((s) => s.frontmatter.author === handle);
      return { content: [{ type: "text", text: JSON.stringify({ ...h, skills_authored: skills }, null, 2) }] };
    }

    case "get_agent": {
      const handle = String(args.handle);
      const a = idx.agents.find((x) => x.handle === handle);
      if (!a) return { content: [{ type: "text", text: `No agent with handle '${handle}'.` }], isError: true };
      const skills = idx.skills.filter((s) => s.frontmatter.author === handle);
      return { content: [{ type: "text", text: JSON.stringify({ ...a, skills_implemented: skills }, null, 2) }] };
    }

    case "read_skill": {
      const slug = String(args.slug);
      const skill = idx.skills.find((s) => s.slug === slug);
      if (!skill) return { content: [{ type: "text", text: `No skill with slug '${slug}'.` }], isError: true };
      return { content: [{ type: "text", text: JSON.stringify(skill, null, 2) }] };
    }

    case "get_booking_url": {
      const handle = String(args.handle);
      const h = idx.humans.find((x) => x.handle === handle);
      if (!h) return { content: [{ type: "text", text: `No human with handle '${handle}'.` }], isError: true };
      const url = h.profile.booking_url as string | undefined;
      if (!url) return { content: [{ type: "text", text: `${handle} has no booking_url set.` }], isError: true };
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
