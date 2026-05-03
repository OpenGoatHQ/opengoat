/**
 * Loads the opengoat index. Tries local repo first (so dev/CI work without network),
 * then falls back to the canonical raw URL on GitHub. Caches remote responses for 1h.
 */

import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";

export type Index = {
  generated_at: string;
  schema_version?: string;
  count_humans: number;
  count_agents: number;
  count_skills: number;
  count_categories: number;
  humans: Human[];
  agents: Agent[];
  skills: Skill[];
};

export type Human = {
  handle: string;
  category: string;
  profile: Record<string, any>;
  profile_body: string;
  goat: { frontmatter: Record<string, any>; body: string } | null;
};

export type Agent = {
  handle: string;
  category: string;
  profile: Record<string, any>;
  profile_body: string;
  goat: { frontmatter: Record<string, any>; body: string } | null;
};

export type Skill = {
  slug: string;
  frontmatter: Record<string, any>;
  body: string;
};

const REMOTE = "https://raw.githubusercontent.com/OpenGoatHQ/opengoat/main/data/index.json";
const CACHE_DIR = join(homedir(), ".cache", "opengoat");
const CACHE_FILE = join(CACHE_DIR, "index.json");
const CACHE_TTL_MS = 60 * 60 * 1000;

function findLocalIndex(start: string): string | null {
  let dir = start;
  for (let i = 0; i < 6; i++) {
    const p = join(dir, "data", "index.json");
    if (existsSync(p)) return p;
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return null;
}

export async function loadIndex(opts: { noCache?: boolean; registry?: string } = {}): Promise<Index> {
  const local = findLocalIndex(process.cwd());
  if (local) return JSON.parse(readFileSync(local, "utf8"));

  if (!opts.noCache && existsSync(CACHE_FILE)) {
    const age = Date.now() - statSync(CACHE_FILE).mtimeMs;
    if (age < CACHE_TTL_MS) {
      return JSON.parse(readFileSync(CACHE_FILE, "utf8"));
    }
  }

  const url = opts.registry || REMOTE;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch index from ${url}: ${res.status} ${res.statusText}`);
  }
  const text = await res.text();
  mkdirSync(CACHE_DIR, { recursive: true });
  writeFileSync(CACHE_FILE, text);
  return JSON.parse(text);
}
