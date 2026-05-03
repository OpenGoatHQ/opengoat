import Link from "next/link";
import type { Playbook, Human } from "@/lib/data";

export function PlaybookCard({ playbook, author }: { playbook: Playbook; author: Human }) {
  const title = (playbook.frontmatter.name as string) || (playbook.frontmatter.title as string) || playbook.slug;
  const description = (playbook.frontmatter.description as string) || "";
  const duration = playbook.frontmatter.duration as string | undefined;
  const difficulty = playbook.frontmatter.difficulty as string | undefined;
  const cost = playbook.frontmatter.cost_hire_min_usd as number | undefined;
  return (
    <Link
      href={`/playbooks/${playbook.slug}`}
      className="block rounded-lg border border-border bg-panel p-5 hover:border-accent transition"
    >
      <div className="text-xs text-dim mb-2">{playbook.category}</div>
      <div className="text-ink font-semibold">{title}</div>
      <div className="text-xs text-dim mt-1">by @{author.handle}</div>
      {description && <p className="mt-3 text-sm text-dim line-clamp-3">{description}</p>}
      <div className="mt-3 flex flex-wrap gap-2 text-xs text-dim">
        {duration && <span>⏱ {duration}</span>}
        {difficulty && <span>· {difficulty}</span>}
        {cost && <span>· from ${cost.toLocaleString()}</span>}
      </div>
    </Link>
  );
}
