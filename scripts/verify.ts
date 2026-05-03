#!/usr/bin/env bun
/**
 * Validates frontmatter on every profile (humans + agents) and skill.
 * goat.md is recommended but optional — we don't fail builds on missing goats.
 */

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dir, "..");
const HUMANS_DIR = join(ROOT, "humans");
const AGENTS_DIR = join(ROOT, "agents");
const SKILLS_DIR = join(ROOT, "skills");

const REQUIRED_HUMAN = ["name", "handle", "specialties", "anti_specialties", "booking_url", "accepting_bookings"];
const REQUIRED_AGENT = ["name", "handle", "builder", "specialties", "runtime", "endpoint", "accepting_calls"];
const REQUIRED_SKILL = ["name", "slug", "category", "description", "author", "author_type", "when_to_use", "when_not_to_use"];

const errors: string[] = [];

function readFm(path: string): Record<string, any> {
  const src = readFileSync(path, "utf8");
  if (!src.startsWith("---")) return {};
  const end = src.indexOf("\n---", 3);
  if (end === -1) return {};
  const raw = src.slice(3, end).trim();
  const fm: Record<string, any> = {};
  let key: string | null = null;
  let list: any[] | null = null;
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

function checkProfile(dir: string, requiredFields: string[], label: string) {
  if (!existsSync(dir)) return;
  for (const cat of readdirSync(dir)) {
    if (cat.startsWith("_") || cat.startsWith(".")) continue;
    const catDir = join(dir, cat);
    if (!statSync(catDir).isDirectory()) continue;
    for (const handle of readdirSync(catDir)) {
      if (handle === "README.md" || handle.startsWith(".")) continue;
      const handleDir = join(catDir, handle);
      if (!statSync(handleDir).isDirectory()) continue;
      const profilePath = join(handleDir, "profile.md");
      if (!existsSync(profilePath)) {
        errors.push(`${label}/${cat}/${handle}: missing profile.md`);
        continue;
      }
      const fm = readFm(profilePath);
      for (const f of requiredFields) {
        if (!(f in fm)) errors.push(`${label}/${cat}/${handle}/profile.md: missing field '${f}'`);
      }
    }
  }
}

function checkSkills() {
  if (!existsSync(SKILLS_DIR)) return;
  for (const slug of readdirSync(SKILLS_DIR)) {
    if (slug.startsWith("_") || slug.startsWith(".")) continue;
    const skillDir = join(SKILLS_DIR, slug);
    if (!statSync(skillDir).isDirectory()) continue;
    const skillPath = join(skillDir, "skill.md");
    if (!existsSync(skillPath)) {
      errors.push(`skills/${slug}: missing skill.md`);
      continue;
    }
    const fm = readFm(skillPath);
    for (const f of REQUIRED_SKILL) {
      if (!(f in fm)) errors.push(`skills/${slug}/skill.md: missing field '${f}'`);
    }
  }
}

checkProfile(HUMANS_DIR, REQUIRED_HUMAN, "humans");
checkProfile(AGENTS_DIR, REQUIRED_AGENT, "agents");
checkSkills();

if (errors.length) {
  console.error("Verification failed:");
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log("All entities valid.");
