#!/usr/bin/env bun
/**
 * Walks humans/<category>/<handle>/profile.md and humans/<category>/<handle>/playbooks/*.md,
 * writes a flat index.json the CLI consumes. Skips _template, files starting with '.',
 * and category READMEs.
 */

import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dir, "..");
const HUMANS_DIR = join(ROOT, "humans");
const OUT = join(ROOT, "data", "index.json");

type Human = {
  handle: string;
  category: string;
  profile: Record<string, any>;
  profile_body: string;
  goat: { frontmatter: Record<string, any>; body: string } | null;
  playbooks: Playbook[];
};

type Playbook = {
  slug: string;
  author: string;
  category: string;
  frontmatter: Record<string, any>;
  body: string;
};

function parseFrontmatter(src: string): { fm: Record<string, any>; body: string } {
  if (!src.startsWith("---")) return { fm: {}, body: src };
  const end = src.indexOf("\n---", 3);
  if (end === -1) return { fm: {}, body: src };
  const raw = src.slice(3, end).trim();
  const body = src.slice(end + 4).replace(/^\n+/, "");
  const fm: Record<string, any> = {};
  let currentList: string[] | null = null;
  for (const line of raw.split("\n")) {
    if (line.startsWith("  - ") && currentList) {
      currentList.push(line.slice(4).trim());
      continue;
    }
    const m = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*):\s*(.*)$/);
    if (!m) continue;
    const [, key, val] = m;
    if (val === "") {
      currentList = [];
      fm[key] = currentList;
    } else if (val.startsWith("[") && val.endsWith("]")) {
      fm[key] = val
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
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
  for (const cat of readdirSync(HUMANS_DIR)) {
    if (cat.startsWith("_") || cat.startsWith(".")) continue;
    const catDir = join(HUMANS_DIR, cat);
    if (!statSync(catDir).isDirectory()) continue;
    for (const handle of readdirSync(catDir)) {
      if (handle === "README.md" || handle.startsWith(".")) continue;
      const handleDir = join(catDir, handle);
      if (!statSync(handleDir).isDirectory()) continue;
      const profilePath = join(handleDir, "profile.md");
      if (!existsSync(profilePath)) continue;
      const { fm, body } = parseFrontmatter(readFileSync(profilePath, "utf8"));

      const goatPath = join(handleDir, "goat.md");
      let goat: { frontmatter: Record<string, any>; body: string } | null = null;
      if (existsSync(goatPath)) {
        const parsed = parseFrontmatter(readFileSync(goatPath, "utf8"));
        goat = { frontmatter: parsed.fm, body: parsed.body };
      }

      const playbooks: Playbook[] = [];
      const pbDir = join(handleDir, "playbooks");
      if (existsSync(pbDir)) {
        for (const file of readdirSync(pbDir)) {
          if (!file.endsWith(".md") || file.startsWith("_") || file.startsWith(".")) continue;
          const parsed = parseFrontmatter(readFileSync(join(pbDir, file), "utf8"));
          playbooks.push({
            slug: (parsed.fm.slug as string) || file.replace(/\.md$/, ""),
            author: handle,
            category: cat,
            frontmatter: parsed.fm,
            body: parsed.body,
          });
        }
      }
      result.push({ handle, category: cat, profile: fm, profile_body: body, goat, playbooks });
    }
  }
  return result;
}

const humans = loadHumans();
const index = {
  generated_at: new Date().toISOString(),
  count_humans: humans.length,
  count_playbooks: humans.reduce((n, h) => n + h.playbooks.length, 0),
  count_runnable_playbooks: humans.reduce((n, h) => n + h.playbooks.filter((pb) => pb.frontmatter.runnable).length, 0),
  count_with_goat_file: humans.filter((h) => h.goat).length,
  count_categories: new Set(humans.map((h) => h.category)).size,
  humans,
};

writeFileSync(OUT, JSON.stringify(index, null, 2));
console.log(`Wrote ${OUT}`);
console.log(`  ${index.count_humans} humans, ${index.count_playbooks} playbooks, ${index.count_categories} active categories`);
