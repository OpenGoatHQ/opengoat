import { loadIndex, type Human } from "../lib/data.js";

type Opts = {
  tag?: string;
  available?: boolean;
  maxRate?: string;
  json?: boolean;
  noCache?: boolean;
  registry?: string;
};

export async function list(opts: Opts) {
  const idx = await loadIndex({ noCache: opts.noCache, registry: opts.registry });
  let humans = idx.humans;

  if (opts.tag) {
    humans = humans.filter((h) => specialties(h).includes(opts.tag!));
  }
  if (opts.available) {
    humans = humans.filter((h) => h.profile.accepting_bookings === true);
  }
  if (opts.maxRate) {
    const max = Number(opts.maxRate);
    humans = humans.filter((h) => {
      const r = Number(h.profile.rate_hourly_usd);
      return Number.isFinite(r) && r <= max;
    });
  }

  if (opts.json) {
    process.stdout.write(JSON.stringify(humans, null, 2) + "\n");
    return;
  }

  if (humans.length === 0) {
    console.log("No humans match.");
    return;
  }
  for (const h of humans) {
    const name = h.profile.name || h.handle;
    const rate = h.profile.rate_hourly_usd ? `$${h.profile.rate_hourly_usd}/h` : "rate n/a";
    const status = h.profile.accepting_bookings ? "open" : "closed";
    const tags = specialties(h).slice(0, 3).join(", ");
    console.log(`${pad(h.handle, 18)} ${pad(name, 24)} ${pad(rate, 10)} ${pad(status, 7)} ${tags}`);
  }
}

function specialties(h: Human): string[] {
  const s = h.profile.specialties;
  return Array.isArray(s) ? s : [];
}

function pad(s: string, n: number): string {
  return s.length >= n ? s.slice(0, n - 1) + " " : s + " ".repeat(n - s.length);
}
