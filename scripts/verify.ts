#!/usr/bin/env bun
/**
 * Validates frontmatter and required fields on every profile and playbook
 * under humans/<category>/<handle>/. Exits non-zero if any are missing or malformed.
 */

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dir, "..");
const HUMANS_DIR = join(ROOT, "humans");

const REQUIRED_PROFILE = ["name", "handle", "specialties", "anti_specialties", "booking_url", "accepting_bookings"];
const REQUIRED_PLAYBOOK = [
  "name",
  "slug",
  "author",
  "tags",
  "category",
  "description",
  "when_to_use",
  "when_not_to_use",
  "duration",
  "human_required",
  "cost_hire_min_usd",
];

const errors: string[] = [];

function readFm(path: string): Record<string, any> {
  const src = readFileSync(path, "utf8");
  if (!src.startsWith("---")) return {};
  const end = src.indexOf("\n---", 3);
  if (end === -1) return {};
  const raw = src.slice(3, end).trim();
  const fm: Record<string, any> = {};
  let key: string | null = null;
  let list: string[] | null = null;
  for (const line of raw.split("\n")) {
    if (line.startsWith("  - ") && list) {
      list.push(line.slice(4).trim());
      continue;
    }
    const m = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*):\s*(.*)$/);
    if (!m) continue;
    key = m[1];
    const val = m[2];
    if (val === "") {
      list = [];
      fm[key] = list;
    } else {
      fm[key] = val;
      list = null;
    }
  }
  return fm;
}

for (const cat of readdirSync(HUMANS_DIR)) {
  if (cat.startsWith("_") || cat.startsWith(".")) continue;
  const catDir = join(HUMANS_DIR, cat);
  if (!statSync(catDir).isDirectory()) continue;
  for (const handle of readdirSync(catDir)) {
    if (handle === "README.md" || handle.startsWith(".")) continue;
    const handleDir = join(catDir, handle);
    if (!statSync(handleDir).isDirectory()) continue;
    const profilePath = join(handleDir, "profile.md");
    if (!existsSync(profilePath)) {
      errors.push(`humans/${cat}/${handle}: missing profile.md`);
      continue;
    }
    const fm = readFm(profilePath);
    for (const f of REQUIRED_PROFILE) {
      if (!(f in fm)) errors.push(`humans/${cat}/${handle}/profile.md: missing field '${f}'`);
    }
    const pbDir = join(handleDir, "playbooks");
    if (existsSync(pbDir)) {
      for (const file of readdirSync(pbDir)) {
        if (!file.endsWith(".md") || file.startsWith("_") || file.startsWith(".")) continue;
        const pbFm = readFm(join(pbDir, file));
        for (const f of REQUIRED_PLAYBOOK) {
          if (!(f in pbFm)) errors.push(`humans/${cat}/${handle}/playbooks/${file}: missing field '${f}'`);
        }
      }
    }
  }
}

if (errors.length) {
  console.error("Verification failed:");
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log("All profiles and playbooks valid.");
