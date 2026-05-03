#!/usr/bin/env node
/**
 * opengoat CLI — entrypoint. Binary: `goat`.
 *
 * Shorthand: `goat <category>` lists operators in that category.
 * Equivalent to `goat list --tag <category>`. We rewrite argv before commander
 * parses so the shorthand is purely sugar — full subcommands still work.
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
  // Don't rewrite if the user passed flags after — those are list options
  process.argv.slice(3).every((a) => a.startsWith("-"))
) {
  const cat = process.argv[2];
  const extra = process.argv.slice(3);
  process.argv = [process.argv[0], process.argv[1], "list", "--tag", cat, ...extra];
}

const program = new Command();
program
  .name("goat")
  .description("opengoat CLI — hire goats of growth, GTM, and distribution.")
  .version("0.0.1")
  .option("--no-cache", "Bypass local cache (default: 1h TTL)")
  .option("--registry <url>", "Custom registry URL");

program
  .command("list")
  .description("List humans, optionally filtered. Shorthand: `goat <category>`.")
  .option("--tag <tag>", "Filter by tag / category")
  .option("--available", "Only humans accepting bookings")
  .option("--max-rate <usd>", "Max hourly rate USD")
  .option("--json", "Machine-readable output")
  .action(async (opts) => list({ ...opts, ...program.opts() }));

program
  .command("search <query>")
  .description("Full-text search across playbooks and profiles.")
  .option("--json", "Machine-readable output")
  .action(async (query, opts) => search(query, { ...opts, ...program.opts() }));

program
  .command("read <slug>")
  .description("Print a playbook to stdout.")
  .option("--raw", "Raw markdown source with frontmatter")
  .option("--json", "Machine-readable output")
  .action(async (slug, opts) => read(slug, { ...opts, ...program.opts() }));

program
  .command("author <handle>")
  .description("Print a human's profile and playbooks.")
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
  .description("Instructions to submit a profile or playbook (interactive wizard in v0.2).")
  .option("--json", "Machine-readable output")
  .action(async (type, opts) => submit(type, opts));

program
  .command("verify [path]")
  .description("Validate a profile or playbook locally.")
  .action(async (target = ".") => verify(target));

program.parseAsync().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
