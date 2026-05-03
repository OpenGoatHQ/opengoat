#!/usr/bin/env bun
/**
 * Parses every human profile and playbook under /humans/ and writes
 * a flat index.json that the CLI consumes. Skips _template.
 */

import { readdirSync, readFileSync, writeFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dir, "..");
const HUMANS_DIR = join(ROOT, "humans");
const OUT = join(ROOT, "data", "index.json");

type Human = {
  handle: string;
  profile: Record<string, unknown>;
  profile_body: string;
  playbooks: Playbook[];
};

type Playbook = {
  slug: string;
  author: string;
  frontmatter: Record<string, unknown>;
  body: string;
};

function parseFrontmatter(src: string): { fm: Record<string, unknown>; body: string } {
  if (!src.startsWith("---")) return { fm: {}, body: src };
  const end = src.indexOf("\n---", 3);
  if (end === -1) return { fm: {}, body: src };
  const raw = src.slice(3, end).trim();
  const body = src.slice(end + 4).replace(/^\n+/, "");
  const fm: Record<string, unknown> = {};
  let currentKey: string | null = null;
  let currentList: string[] | null = null;
  for (const line of raw.split("\n")) {
    if (line.startsWith("  - ") && currentList) {
      currentList.push(line.slice(4).trim());
      continue;
    }
    const m = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*):\s*(.*)$/);
    if (!m) continue;
    const [, key, val] = m;
    currentKey = key;
    if (val === "") {
      currentList = [];
      fm[key] = currentList;
    } else if (val.startsWith("[") && val.endsWith("]")) {
      fm[key] = val.slice(1, -1).split(",").map((s) => s.trim()).filter(Boolean);
      currentList = null;
    } else if (val === "true" || val === "false") {
      fm[key] = val === "true";
      currentList = null;
    } else if (/^-?\d+(\.\d+)?$/.test(val)) {
      fm[key] = Number(val);
      currentList = null;
    } else {
      fm[key] = val.replace(/^["']|["']$/g, "");
      currentList = null;
    }
  }
  return { fm, body };
}

function loadHumans(): Human[] {
  const result: Human[] = [];
  for (const handle of readdirSync(HUMANS_DIR)) {
    if (handle.startsWith("_") || handle.startsWith(".")) continue;
    const dir = join(HUMANS_DIR, handle);
    if (!statSync(dir).isDirectory()) continue;
    const profilePath = join(dir, "profile.md");
    if (!existsSync(profilePath)) continue;
    const { fm, body } = parseFrontmatter(readFileSync(profilePath, "utf8"));
    const playbooks: Playbook[] = [];
    const pbDir = join(dir, "playbooks");
    if (existsSync(pbDir)) {
      for (const file of readdirSync(pbDir)) {
        if (!file.endsWith(".md") || file.startsWith("_")) continue;
        const pbPath = join(pbDir, file);
        const parsed = parseFrontmatter(readFileSync(pbPath, "utf8"));
        playbooks.push({
          slug: (parsed.fm.slug as string) || file.replace(/\.md$/, ""),
          author: handle,
          frontmatter: parsed.fm,
          body: parsed.body,
        });
      }
    }
    result.push({ handle, profile: fm, profile_body: body, playbooks });
  }
  return result;
}

const humans = loadHumans();
const index = {
  generated_at: new Date().toISOString(),
  count_humans: humans.length,
  count_playbooks: humans.reduce((n, h) => n + h.playbooks.length, 0),
  humans,
};

writeFileSync(OUT, JSON.stringify(index, null, 2));
console.log(`Wrote ${OUT}`);
console.log(`  ${index.count_humans} humans, ${index.count_playbooks} playbooks`);
