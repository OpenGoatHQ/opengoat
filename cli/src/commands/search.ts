import { loadIndex } from "../lib/data.js";

type Opts = { json?: boolean; noCache?: boolean; registry?: string };

type Hit = {
  type: "human" | "agent" | "skill";
  handle?: string;
  slug?: string;
  title: string;
  score: number;
  snippet: string;
};

export async function search(query: string, opts: Opts) {
  const idx = await loadIndex({ noCache: opts.noCache, registry: opts.registry });
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) {
    console.error("Empty query.");
    process.exit(1);
  }

  const hits: Hit[] = [];

  for (const h of idx.humans) {
    const text = (h.profile_body + " " + JSON.stringify(h.profile)).toLowerCase();
    const sc = score(text, terms);
    if (sc > 0) {
      hits.push({
        type: "human",
        handle: h.handle,
        title: (h.profile.name as string) || h.handle,
        score: sc,
        snippet: snippet(h.profile_body, terms),
      });
    }
  }

  for (const a of idx.agents) {
    const text = (a.profile_body + " " + JSON.stringify(a.profile)).toLowerCase();
    const sc = score(text, terms);
    if (sc > 0) {
      hits.push({
        type: "agent",
        handle: a.handle,
        title: (a.profile.name as string) || a.handle,
        score: sc,
        snippet: snippet(a.profile_body, terms),
      });
    }
  }

  for (const s of idx.skills) {
    const text = (s.body + " " + JSON.stringify(s.frontmatter)).toLowerCase();
    const sc = score(text, terms);
    if (sc > 0) {
      hits.push({
        type: "skill",
        slug: s.slug,
        title: (s.frontmatter.name as string) || s.slug,
        score: sc,
        snippet: snippet(s.body, terms),
      });
    }
  }

  hits.sort((a, b) => b.score - a.score);

  if (opts.json) {
    process.stdout.write(JSON.stringify(hits, null, 2) + "\n");
    return;
  }
  if (hits.length === 0) {
    console.log("No matches.");
    return;
  }
  for (const hit of hits.slice(0, 20)) {
    const icon = hit.type === "human" ? "👤" : hit.type === "agent" ? "🤖" : "📘";
    const id = hit.type === "skill" ? hit.slug : `@${hit.handle}`;
    console.log(`${icon} ${hit.title} (${id})`);
    console.log(`   ${hit.snippet}`);
    console.log();
  }
}

function score(text: string, terms: string[]): number {
  let n = 0;
  for (const t of terms) n += text.split(t).length - 1;
  return n;
}

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
