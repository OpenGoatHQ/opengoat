import { loadIndex } from "../lib/data.js";

type EntityType = "human" | "agent" | "skill";

type Opts = {
  tag?: string;
  available?: boolean;
  maxRate?: string;
  type?: EntityType;
  json?: boolean;
  noCache?: boolean;
  registry?: string;
};

export async function list(opts: Opts) {
  const idx = await loadIndex({ noCache: opts.noCache, registry: opts.registry });

  const rows: Array<{ type: EntityType; row: any }> = [];

  if (!opts.type || opts.type === "human") {
    let humans = idx.humans;
    if (opts.tag) humans = humans.filter((h) => arr(h.profile.specialties).includes(opts.tag!) || h.category === opts.tag);
    if (opts.available) humans = humans.filter((h) => h.profile.accepting_bookings === true);
    if (opts.maxRate) {
      const max = Number(opts.maxRate);
      humans = humans.filter((h) => Number.isFinite(Number(h.profile.rate_hourly_usd)) && Number(h.profile.rate_hourly_usd) <= max);
    }
    for (const h of humans) rows.push({ type: "human", row: h });
  }

  if (!opts.type || opts.type === "agent") {
    let agents = idx.agents;
    if (opts.tag) agents = agents.filter((a) => arr(a.profile.specialties).includes(opts.tag!) || a.category === opts.tag);
    if (opts.available) agents = agents.filter((a) => a.profile.accepting_calls === true);
    for (const a of agents) rows.push({ type: "agent", row: a });
  }

  if (!opts.type || opts.type === "skill") {
    let skills = idx.skills;
    if (opts.tag) skills = skills.filter((s) => arr(s.frontmatter.tags).includes(opts.tag!) || s.frontmatter.category === opts.tag);
    for (const s of skills) rows.push({ type: "skill", row: s });
  }

  if (opts.json) {
    process.stdout.write(JSON.stringify(rows, null, 2) + "\n");
    return;
  }

  if (rows.length === 0) {
    console.log("No matches.");
    return;
  }

  for (const { type, row } of rows) {
    if (type === "human") {
      const name = row.profile.name || row.handle;
      const rate = row.profile.rate_hourly_usd ? `$${row.profile.rate_hourly_usd}/h` : "rate n/a";
      const status = row.profile.accepting_bookings ? "open" : "closed";
      console.log(`👤 ${pad(row.handle, 18)} ${pad(name, 24)} ${pad(rate, 10)} ${pad(status, 7)} ${row.category}`);
    } else if (type === "agent") {
      const name = row.profile.name || row.handle;
      const price = row.profile.price_per_call_usd !== undefined ? `$${row.profile.price_per_call_usd}/call` : "price n/a";
      const status = row.profile.accepting_calls ? "open" : "closed";
      console.log(`🤖 ${pad(row.handle, 18)} ${pad(name, 24)} ${pad(price, 12)} ${pad(status, 7)} ${row.category}`);
    } else {
      const title = row.frontmatter.name || row.slug;
      console.log(`📘 ${pad(row.slug, 24)} ${pad(title, 32)} by @${row.frontmatter.author}`);
    }
  }
}

function arr(v: any): string[] {
  return Array.isArray(v) ? v : [];
}

function pad(s: string, n: number): string {
  return s.length >= n ? s.slice(0, n - 1) + " " : s + " ".repeat(n - s.length);
}
