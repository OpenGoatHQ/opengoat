import { loadIndex } from "../lib/data.js";

type Opts = { json?: boolean; noCache?: boolean; registry?: string; type?: "human" | "agent" };

export async function author(handle: string, opts: Opts) {
  const idx = await loadIndex({ noCache: opts.noCache, registry: opts.registry });

  const human = idx.humans.find((x) => x.handle === handle);
  const agent = idx.agents.find((x) => x.handle === handle);

  let entity: any = null;
  let type: "human" | "agent" | null = null;

  if (opts.type === "human" || (!opts.type && human && !agent)) {
    entity = human;
    type = "human";
  } else if (opts.type === "agent" || (!opts.type && agent && !human)) {
    entity = agent;
    type = "agent";
  } else if (human && agent) {
    console.error(`Ambiguous handle '${handle}' (matches both human and agent). Use --type human|agent.`);
    process.exit(1);
  }

  if (!entity) {
    console.error(`No human or agent with handle '${handle}'.`);
    process.exit(1);
  }

  const skills = idx.skills.filter((s) => s.frontmatter.author === handle);

  if (opts.json) {
    process.stdout.write(JSON.stringify({ type, entity, skills }, null, 2) + "\n");
    return;
  }

  const name = entity.profile.name || entity.handle;
  console.log(`# ${name} (${type})`);

  if (type === "human") {
    const rate = entity.profile.rate_hourly_usd ? `$${entity.profile.rate_hourly_usd}/h` : "rate n/a";
    const status = entity.profile.accepting_bookings ? "open" : "closed";
    console.log(`${rate} — ${status}`);
    if (entity.profile.booking_url) console.log(`Book: ${entity.profile.booking_url}`);
  } else {
    const price = entity.profile.price_per_call_usd !== undefined ? `$${entity.profile.price_per_call_usd}/call` : "price n/a";
    const status = entity.profile.accepting_calls ? "open" : "closed";
    console.log(`${price} — ${status}`);
    if (entity.profile.builder) console.log(`Built by: @${entity.profile.builder}`);
    if (entity.profile.endpoint) console.log(`Endpoint: ${entity.profile.endpoint}`);
  }

  console.log();
  console.log(entity.profile_body.trim());

  if (entity.goat) {
    console.log();
    console.log(`---`);
    console.log(`# Why hire beyond skills (goat.md)`);
    console.log(entity.goat.body.trim());
  }

  console.log();
  if (skills.length) {
    console.log("Skills:");
    for (const s of skills) {
      const title = (s.frontmatter.name as string) || s.slug;
      console.log(`  - ${title} (${s.slug})`);
    }
  } else {
    console.log("No skills authored yet.");
  }
}
