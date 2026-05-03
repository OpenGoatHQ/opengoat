import fs from "node:fs";
import path from "node:path";

export type Index = {
  generated_at: string;
  count_humans: number;
  count_playbooks: number;
  count_categories?: number;
  humans: Human[];
};

export type Human = {
  handle: string;
  category: string;
  profile: Record<string, any>;
  profile_body: string;
  goat: { frontmatter: Record<string, any>; body: string } | null;
  playbooks: Playbook[];
};

export type Runnable = {
  via: "orthogonal" | "http" | "mcp";
  cost_per_run_usd?: number;
  api?: string;
  path?: string;
  endpoint?: string;
  method?: string;
  server?: string;
  tool?: string;
  inputs?: Array<{ name: string; type: string; required?: boolean }>;
};

export type Playbook = {
  slug: string;
  author: string;
  category: string;
  frontmatter: Record<string, any>;
  body: string;
};

const INDEX_PATH = path.resolve(process.cwd(), "..", "data", "index.json");

let cached: Index | null = null;

export function loadIndex(): Index {
  if (cached) return cached;
  if (!fs.existsSync(INDEX_PATH)) {
    cached = { generated_at: new Date().toISOString(), count_humans: 0, count_playbooks: 0, humans: [] };
    return cached;
  }
  const raw = fs.readFileSync(INDEX_PATH, "utf8");
  cached = JSON.parse(raw) as Index;
  return cached;
}

export function getHuman(handle: string): Human | undefined {
  return loadIndex().humans.find((h) => h.handle === handle);
}

export function getPlaybook(slug: string): { playbook: Playbook; author: Human } | undefined {
  for (const h of loadIndex().humans) {
    for (const pb of h.playbooks) {
      if (pb.slug === slug) return { playbook: pb, author: h };
    }
  }
  return undefined;
}

export function humansByCategory(category: string): Human[] {
  return loadIndex().humans.filter((h) => h.category === category);
}

export function allHandles(): string[] {
  return loadIndex().humans.map((h) => h.handle);
}

export function allSlugs(): string[] {
  return loadIndex().humans.flatMap((h) => h.playbooks.map((pb) => pb.slug));
}

export function allPlaybooks(): { playbook: Playbook; author: Human }[] {
  const result: { playbook: Playbook; author: Human }[] = [];
  for (const h of loadIndex().humans) {
    for (const pb of h.playbooks) result.push({ playbook: pb, author: h });
  }
  return result;
}
