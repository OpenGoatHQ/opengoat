#!/usr/bin/env node
/**
 * opengoat CLI — entrypoint.
 * Stub. Each command lives in ./commands and gets wired in here.
 */

import { Command } from "commander";

const program = new Command();
program
  .name("opengoat")
  .description("Open directory of growth, GTM, and distribution operators.")
  .version("0.0.1");

program
  .command("list")
  .description("List humans, optionally filtered.")
  .option("--tag <tag>", "Filter by tag")
  .option("--available", "Only humans accepting bookings")
  .option("--max-rate <usd>", "Max hourly rate USD")
  .option("--json", "Machine-readable output")
  .action(() => {
    console.log("TODO: implement list");
  });

program
  .command("search <query>")
  .description("Full-text search across playbooks and profiles.")
  .option("--json", "Machine-readable output")
  .action(() => {
    console.log("TODO: implement search");
  });

program
  .command("read <slug>")
  .description("Print a playbook to stdout.")
  .option("--raw", "Raw markdown source")
  .option("--json", "Machine-readable output")
  .action(() => {
    console.log("TODO: implement read");
  });

program
  .command("author <handle>")
  .description("Print a human's profile and playbooks.")
  .option("--json", "Machine-readable output")
  .action(() => {
    console.log("TODO: implement author");
  });

program
  .command("hire <handle>")
  .description("Open the human's booking link.")
  .option("--print", "Print URL instead of opening")
  .action(() => {
    console.log("TODO: implement hire");
  });

program
  .command("submit [type]")
  .description("Interactive wizard to submit a profile or playbook.")
  .action(() => {
    console.log("TODO: implement submit");
  });

program
  .command("verify [path]")
  .description("Validate a profile or playbook locally.")
  .action(() => {
    console.log("TODO: implement verify");
  });

program.parse();
