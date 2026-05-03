import { loadIndex } from "../lib/data.js";

type Opts = { raw?: boolean; json?: boolean; noCache?: boolean; registry?: string };

export async function read(slug: string, opts: Opts) {
  const idx = await loadIndex({ noCache: opts.noCache, registry: opts.registry });
  const skill = idx.skills.find((s) => s.slug === slug);
  if (!skill) {
    console.error(`No skill with slug '${slug}'.`);
    process.exit(1);
  }
  if (opts.json) {
    process.stdout.write(JSON.stringify(skill, null, 2) + "\n");
    return;
  }
  if (opts.raw) {
    process.stdout.write(serializeRaw(skill) + "\n");
    return;
  }
  const title = (skill.frontmatter.name as string) || skill.slug;
  console.log(`# ${title}`);
  console.log(`by @${skill.frontmatter.author} (${skill.frontmatter.author_type})\n`);
  console.log(skill.body);
}

function serializeRaw(skill: { frontmatter: Record<string, any>; body: string }): string {
  const fm = Object.entries(skill.frontmatter)
    .map(([k, v]) => {
      if (Array.isArray(v)) return `${k}:\n${v.map((x) => `  - ${typeof x === "string" ? x : JSON.stringify(x)}`).join("\n")}`;
      return `${k}: ${v}`;
    })
    .join("\n");
  return `---\n${fm}\n---\n\n${skill.body}`;
}
