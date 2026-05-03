import fs from "node:fs";
import path from "node:path";

export type Index = {
  generated_at: string;
  schema_version?: string;
  count_humans: number;
  count_agents: number;
  count_skills: number;
  count_with_goat_human?: number;
  count_with_goat_agent?: number;
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

const INDEX_PATH = path.resolve(process.cwd(), "..", "data", "index.json");

let cached: Index | null = null;

export function loadIndex(): Index {
  if (cached) return cached;
  if (!fs.existsSync(INDEX_PATH)) {
    cached = {
      generated_at: new Date().toISOString(),
      schema_version: "0.2",
      count_humans: 0,
      count_agents: 0,
      count_skills: 0,
      count_categories: 0,
      humans: [],
      agents: [],
      skills: [],
    };
    return cached;
  }
  const raw = fs.readFileSync(INDEX_PATH, "utf8");
  cached = JSON.parse(raw) as Index;
  return cached;
}

// Humans
export function getHuman(handle: string): Human | undefined {
  return loadIndex().humans.find((h) => h.handle === handle);
}

export function humansByCategory(category: string): Human[] {
  return loadIndex().humans.filter((h) => h.category === category);
}

export function allHumanHandles(): string[] {
  return loadIndex().humans.map((h) => h.handle);
}

// Agents
export function getAgent(handle: string): Agent | undefined {
  return loadIndex().agents.find((a) => a.handle === handle);
}

export function agentsByCategory(category: string): Agent[] {
  return loadIndex().agents.filter((a) => a.category === category);
}

export function allAgentHandles(): string[] {
  return loadIndex().agents.map((a) => a.handle);
}

// Skills
export function getSkill(slug: string): Skill | undefined {
  return loadIndex().skills.find((s) => s.slug === slug);
}

export function skillsByCategory(category: string): Skill[] {
  return loadIndex().skills.filter((s) => s.frontmatter.category === category);
}

export function allSkillSlugs(): string[] {
  return loadIndex().skills.map((s) => s.slug);
}

export function skillsByAuthor(handle: string): Skill[] {
  return loadIndex().skills.filter((s) => s.frontmatter.author === handle);
}
