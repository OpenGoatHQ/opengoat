#!/usr/bin/env node
/**
 * opengoat CLI — entrypoint. Binary: `goat`.
 *
 * Three entity types: humans, agents, skills.
 *
 * Shorthand: `goat <category>` lists everything in that category.
 * Equivalent to `goat list --tag <category>`.
 */

import { Command } from "commander";
import { author } from "./commands/author.js";
import { hire } from "./commands/hire.js";
import { list } from "./commands/list.js";
import { read } from "./commands/read.js";
import { search } from "./commands/search.js";
import { submit } from "./commands/submit.js";
import { verify } from "./commands/verify.js";

const CATEGORIES = [
  "seo",
  "content",
  "video",
  "email",
  "paid",
  "community",
  "reddit",
  "plg",
  "outbound",
  "launches",
  "pr",
  "platform",
  "gtm-engineering",
];

// Rewrite `goat <category>` → `goat list --tag <category>` before commander parses.
if (
  process.argv.length >= 3 &&
  CATEGORIES.includes(process.argv[2]) &&
  process.argv.slice(3).every((a) => a.startsWith("-"))
) {
  const cat = process.argv[2];
  const extra = process.argv.slice(3);
  process.argv = [process.argv[0], process.argv[1], "list", "--tag", cat, ...extra];
}

const program = new Command();
program
  .name("goat")
  .description("opengoat CLI — humans, agents, and skills for the agent era.")
  .version("0.0.2")
  .option("--no-cache", "Bypass local cache (default: 1h TTL)")
  .option("--registry <url>", "Custom registry URL");

program
  .command("list")
  .description("List entities. Defaults to all types. Shorthand: `goat <category>`.")
  .option("--type <type>", "Filter by type: human | agent | skill")
  .option("--tag <tag>", "Filter by tag / category")
  .option("--available", "Only entities accepting work")
  .option("--max-rate <usd>", "Max hourly rate USD (humans)")
  .option("--json", "Machine-readable output")
  .action(async (opts) => list({ ...opts, ...program.opts() }));

program
  .command("humans")
  .description("List humans only.")
  .option("--tag <tag>", "Filter by tag / category")
  .option("--available", "Only accepting bookings")
  .option("--max-rate <usd>", "Max hourly rate USD")
  .option("--json", "Machine-readable output")
  .action(async (opts) => list({ ...opts, type: "human", ...program.opts() }));

program
  .command("agents")
  .description("List agents only.")
  .option("--tag <tag>", "Filter by tag / category")
  .option("--available", "Only accepting calls")
  .option("--json", "Machine-readable output")
  .action(async (opts) => list({ ...opts, type: "agent", ...program.opts() }));

program
  .command("skills")
  .description("List skills only.")
  .option("--tag <tag>", "Filter by tag / category")
  .option("--json", "Machine-readable output")
  .action(async (opts) => list({ ...opts, type: "skill", ...program.opts() }));

program
  .command("search <query>")
  .description("Full-text search across humans, agents, skills.")
  .option("--json", "Machine-readable output")
  .action(async (query, opts) => search(query, { ...opts, ...program.opts() }));

program
  .command("read <slug>")
  .description("Print a skill to stdout.")
  .option("--raw", "Raw markdown source with frontmatter")
  .option("--json", "Machine-readable output")
  .action(async (slug, opts) => read(slug, { ...opts, ...program.opts() }));

program
  .command("author <handle>")
  .description("Print a human or agent profile and skills they authored.")
  .option("--type <type>", "human | agent (disambiguate when both exist)")
  .option("--json", "Machine-readable output")
  .action(async (handle, opts) => author(handle, { ...opts, ...program.opts() }));

program
  .command("hire <handle>")
  .description("Open the human's booking link.")
  .option("--print", "Print URL instead of opening")
  .option("--json", "Machine-readable output")
  .action(async (handle, opts) => hire(handle, { ...opts, ...program.opts() }));

program
  .command("submit [type]")
  .description("Instructions to submit a human, agent, or skill.")
  .option("--json", "Machine-readable output")
  .action(async (type, opts) => submit(type, opts));

program
  .command("verify [path]")
  .description("Validate entities in a directory or a single file.")
  .action(async (target = ".") => verify(target));

program.parseAsync().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
