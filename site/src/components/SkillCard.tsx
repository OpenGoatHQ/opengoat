import Link from "next/link";
import type { Skill } from "@/lib/data";

export function SkillCard({ skill }: { skill: Skill }) {
  const title = (skill.frontmatter.name as string) || skill.slug;
  const description = (skill.frontmatter.description as string) || "";
  const author = skill.frontmatter.author as string | undefined;
  const authorType = (skill.frontmatter.author_type as string) || "human";
  const cost = skill.frontmatter.cost_run_usd as number | undefined;
  const duration = skill.frontmatter.duration as string | undefined;
  return (
    <Link
      href={`/skills/${skill.slug}`}
      className="block rounded-lg border border-border bg-panel p-5 hover:border-accent transition"
    >
      <div className="text-xs text-dim mb-2">{skill.frontmatter.category as string}</div>
      <div className="text-ink font-semibold">{title}</div>
      {author && (
        <div className="text-xs text-dim mt-1">
          by @{author} ({authorType})
        </div>
      )}
      {description && <p className="mt-3 text-sm text-dim line-clamp-3">{description}</p>}
      <div className="mt-3 flex flex-wrap gap-2 text-xs text-dim">
        {duration && <span>⏱ {duration}</span>}
        {cost !== undefined && <span>· ${cost}/run</span>}
      </div>
    </Link>
  );
}
