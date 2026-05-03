import { loadIndex, type Human, type Playbook } from "../lib/data.js";

type Opts = { json?: boolean; noCache?: boolean; registry?: string };

type Hit = {
  type: "playbook" | "human";
  handle: string;
  slug?: string;
  title: string;
  score: number;
  snippet: string;
};

export async function search(query: string, opts: Opts) {
  const idx = await loadIndex({ noCache: opts.noCache, registry: opts.registry });
  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
  if (terms.length === 0) {
    console.error("Empty query.");
    process.exit(1);
  }

  const hits: Hit[] = [];
  for (const h of idx.humans) {
    const profileText = (h.profile_body + " " + JSON.stringify(h.profile)).toLowerCase();
    const profileScore = score(profileText, terms);
    if (profileScore > 0) {
      hits.push({
        type: "human",
        handle: h.handle,
        title: h.profile.name || h.handle,
        score: profileScore,
        snippet: snippet(h.profile_body, terms),
      });
    }
    for (const pb of h.playbooks) {
      const text = (pb.body + " " + JSON.stringify(pb.frontmatter)).toLowerCase();
      const sc = score(text, terms);
      if (sc > 0) {
        hits.push({
          type: "playbook",
          handle: h.handle,
          slug: pb.slug,
          title: (pb.frontmatter.title as string) || pb.slug,
          score: sc,
          snippet: snippet(pb.body, terms),
        });
      }
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
    const head = hit.type === "playbook" ? `📘 ${hit.title} (${hit.slug}) — by ${hit.handle}` : `👤 ${hit.title} (${hit.handle})`;
    console.log(head);
    console.log(`   ${hit.snippet}`);
    console.log();
  }
}

function score(text: string, terms: string[]): number {
  let n = 0;
  for (const t of terms) {
    const matches = text.split(t).length - 1;
    n += matches;
  }
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
