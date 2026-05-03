import { loadIndex } from "../lib/data.js";

type Opts = { json?: boolean; noCache?: boolean; registry?: string };

export async function author(handle: string, opts: Opts) {
  const idx = await loadIndex({ noCache: opts.noCache, registry: opts.registry });
  const h = idx.humans.find((x) => x.handle === handle);
  if (!h) {
    console.error(`No human with handle '${handle}'.`);
    process.exit(1);
  }
  if (opts.json) {
    process.stdout.write(JSON.stringify(h, null, 2) + "\n");
    return;
  }
  const name = h.profile.name || h.handle;
  const rate = h.profile.rate_hourly_usd ? `$${h.profile.rate_hourly_usd}/h` : "rate n/a";
  const status = h.profile.accepting_bookings ? "open" : "closed";
  console.log(`# ${name} (${h.handle})`);
  console.log(`${rate} — ${status}`);
  if (h.profile.booking_url) console.log(`Book: ${h.profile.booking_url}`);
  console.log();
  console.log(h.profile_body.trim());
  console.log();
  if (h.playbooks.length) {
    console.log("Playbooks:");
    for (const pb of h.playbooks) {
      const title = (pb.frontmatter.title as string) || pb.slug;
      console.log(`  - ${title} (${pb.slug})`);
    }
  } else {
    console.log("No playbooks yet.");
  }
}
