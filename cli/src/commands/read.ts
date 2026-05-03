import { loadIndex } from "../lib/data.js";

type Opts = { raw?: boolean; json?: boolean; noCache?: boolean; registry?: string };

export async function read(slug: string, opts: Opts) {
  const idx = await loadIndex({ noCache: opts.noCache, registry: opts.registry });
  for (const h of idx.humans) {
    for (const pb of h.playbooks) {
      if (pb.slug === slug) {
        if (opts.json) {
          process.stdout.write(JSON.stringify(pb, null, 2) + "\n");
          return;
        }
        if (opts.raw) {
          process.stdout.write(serializeRaw(pb) + "\n");
          return;
        }
        const title = (pb.frontmatter.title as string) || pb.slug;
        console.log(`# ${title}`);
        console.log(`by ${pb.author}\n`);
        console.log(pb.body);
        return;
      }
    }
  }
  console.error(`No playbook with slug '${slug}'.`);
  process.exit(1);
}

function serializeRaw(pb: { frontmatter: Record<string, any>; body: string }): string {
  const fm = Object.entries(pb.frontmatter)
    .map(([k, v]) => {
      if (Array.isArray(v)) return `${k}:\n${v.map((x) => `  - ${x}`).join("\n")}`;
      return `${k}: ${v}`;
    })
    .join("\n");
  return `---\n${fm}\n---\n\n${pb.body}`;
}
