#!/usr/bin/env bun
/**
 * Validates frontmatter and required fields on every profile and playbook
 * under /humans/. Exits non-zero if any are missing or malformed.
 */

import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dir, "..");
const HUMANS_DIR = join(ROOT, "humans");

const REQUIRED_PROFILE_FIELDS = [
  "name",
  "handle",
  "specialties",
  "anti_specialties",
  "booking_url",
  "accepting_bookings",
];
const REQUIRED_PLAYBOOK_FIELDS = ["title", "slug", "author", "tags"];

const errors: string[] = [];

function readFm(path: string): Record<string, unknown> {
  const src = readFileSync(path, "utf8");
  if (!src.startsWith("---")) return {};
  const end = src.indexOf("\n---", 3);
  if (end === -1) return {};
  const raw = src.slice(3, end).trim();
  const fm: Record<string, unknown> = {};
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

for (const handle of readdirSync(HUMANS_DIR)) {
  if (handle.startsWith("_") || handle.startsWith(".")) continue;
  const dir = join(HUMANS_DIR, handle);
  if (!statSync(dir).isDirectory()) continue;
  const profilePath = join(dir, "profile.md");
  if (!existsSync(profilePath)) {
    errors.push(`humans/${handle}: missing profile.md`);
    continue;
  }
  const fm = readFm(profilePath);
  for (const f of REQUIRED_PROFILE_FIELDS) {
    if (!(f in fm)) errors.push(`humans/${handle}/profile.md: missing field '${f}'`);
  }
  const pbDir = join(dir, "playbooks");
  if (existsSync(pbDir)) {
    for (const file of readdirSync(pbDir)) {
      if (!file.endsWith(".md") || file.startsWith("_")) continue;
      const pbPath = join(pbDir, file);
      const pbFm = readFm(pbPath);
      for (const f of REQUIRED_PLAYBOOK_FIELDS) {
        if (!(f in pbFm)) errors.push(`humans/${handle}/playbooks/${file}: missing field '${f}'`);
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
