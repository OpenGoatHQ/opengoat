#!/usr/bin/env bun
/**
 * Walks the three entity directories (humans, agents, skills) and writes
 * a flat index.json that every consumer (site, CLI, MCP server) reads.
 *
 * humans/<category>/<handle>/profile.md + goat.md
 * agents/<category>/<handle>/profile.md + goat.md
 * skills/<slug>/skill.md
 *
 * Skips _template, files starting with '.', and category READMEs.
 */

import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dir, "..");
const HUMANS_DIR = join(ROOT, "humans");
const AGENTS_DIR = join(ROOT, "agents");
const SKILLS_DIR = join(ROOT, "skills");
const OUT = join(ROOT, "data", "index.json");

type Profile = {
  handle: string;
  category: string;
  profile: Record<string, any>;
  profile_body: string;
  goat: { frontmatter: Record<string, any>; body: string } | null;
};

type Skill = {
  slug: string;
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
  let currentList: any[] | null = null;
  let currentKey: string | null = null;
  for (const line of raw.split("\n")) {
    if (line.startsWith("  - ") && currentList) {
      const v = line.slice(4).trim();
      if (v.startsWith("{") && v.endsWith("}")) {
        try {
          currentList.push(JSON.parse(v.replace(/(\w+):/g, '"$1":').replace(/'/g, '"')));
        } catch {
          currentList.push(v);
        }
      } else {
        currentList.push(v);
      }
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

function loadEntityWithGoat(dir: string): Profile[] {
  if (!existsSync(dir)) return [];
  const result: Profile[] = [];
  for (const cat of readdirSync(dir)) {
    if (cat.startsWith("_") || cat.startsWith(".")) continue;
    const catDir = join(dir, cat);
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

      result.push({ handle, category: cat, profile: fm, profile_body: body, goat });
    }
  }
  return result;
}

function loadSkills(): Skill[] {
  if (!existsSync(SKILLS_DIR)) return [];
  const result: Skill[] = [];
  for (const slug of readdirSync(SKILLS_DIR)) {
    if (slug.startsWith("_") || slug.startsWith(".")) continue;
    const skillDir = join(SKILLS_DIR, slug);
    if (!statSync(skillDir).isDirectory()) continue;
    const skillPath = join(skillDir, "skill.md");
    if (!existsSync(skillPath)) continue;
    const { fm, body } = parseFrontmatter(readFileSync(skillPath, "utf8"));
    result.push({ slug: (fm.slug as string) || slug, frontmatter: fm, body });
  }
  return result;
}

const humans = loadEntityWithGoat(HUMANS_DIR);
const agents = loadEntityWithGoat(AGENTS_DIR);
const skills = loadSkills();

const index = {
  generated_at: new Date().toISOString(),
  schema_version: "0.2",
  count_humans: humans.length,
  count_agents: agents.length,
  count_skills: skills.length,
  count_with_goat_human: humans.filter((h) => h.goat).length,
  count_with_goat_agent: agents.filter((a) => a.goat).length,
  count_categories: new Set([...humans, ...agents].map((e) => e.category)).size,
  humans,
  agents,
  skills,
};

writeFileSync(OUT, JSON.stringify(index, null, 2));
console.log(`Wrote ${OUT}`);
console.log(`  ${index.count_humans} humans, ${index.count_agents} agents, ${index.count_skills} skills`);
console.log(`  ${index.count_categories} active categories`);
