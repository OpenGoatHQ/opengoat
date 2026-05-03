import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { allSkillSlugs, getSkill, getHuman, getAgent } from "@/lib/data";
import { Markdown } from "@/components/Markdown";
import { asArray, ensureUrl } from "@/lib/format";

export function generateStaticParams() {
  return allSkillSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) return { title: "Not found" };
  const title = (skill.frontmatter.name as string) || skill.slug;
  const description = (skill.frontmatter.description as string) || "";
  return { title, description };
}

export default async function SkillPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) notFound();

  const title = (skill.frontmatter.name as string) || skill.slug;
  const description = (skill.frontmatter.description as string) || "";
  const authorHandle = skill.frontmatter.author as string | undefined;
  const authorType = (skill.frontmatter.author_type as string) || "human";
  const author = authorHandle ? (authorType === "agent" ? getAgent(authorHandle) : getHuman(authorHandle)) : undefined;
  const authorName = author ? ((author.profile.name as string) || authorHandle) : authorHandle;
  const authorBooking = authorType === "human" && author ? ensureUrl((author as any).profile.booking_url) : undefined;

  const whenToUse = asArray(skill.frontmatter.when_to_use);
  const whenNotToUse = asArray(skill.frontmatter.when_not_to_use);
  const prerequisites = asArray(skill.frontmatter.prerequisites);
  const outputs = asArray(skill.frontmatter.outputs);
  const duration = skill.frontmatter.duration as string | undefined;
  const difficulty = skill.frontmatter.difficulty as string | undefined;
  const humanRequired = skill.frontmatter.human_required as boolean | undefined;
  const costRun = skill.frontmatter.cost_run_usd as number | undefined;
  const costHire = skill.frontmatter.cost_hire_min_usd as number | undefined;
  const implementations = (skill.frontmatter.implementations as Array<Record<string, any>>) || [];

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <div className="text-sm text-dim mb-3">
        <Link href={`/c/${skill.frontmatter.category}`} className="hover:text-ink">{skill.frontmatter.category as string}</Link>
        <span className="mx-2">·</span>
        <span className="text-accent">skill</span>
      </div>
      <h1 className="text-4xl font-semibold tracking-tight text-ink">{title}</h1>
      {authorHandle && (
        <div className="mt-2 text-dim">
          by{" "}
          <Link
            href={authorType === "agent" ? `/agents/${authorHandle}` : `/humans/${authorHandle}`}
            className="text-ink hover:text-accent"
          >
            @{authorHandle}
          </Link>
          <span className="ml-1 text-dim">({authorType})</span>
        </div>
      )}
      {description && <p className="mt-4 text-lg text-ink/90">{description}</p>}

      <div className="mt-6 flex flex-wrap gap-2 text-xs">
        {duration && <span className="px-2 py-1 rounded border border-border text-dim">⏱ {duration}</span>}
        {difficulty && <span className="px-2 py-1 rounded border border-border text-dim">{difficulty}</span>}
        {humanRequired !== undefined && (
          <span className="px-2 py-1 rounded border border-border text-dim">
            {humanRequired ? "human required" : "agent-executable"}
          </span>
        )}
        {costRun !== undefined && (
          <span className="px-2 py-1 rounded border border-border text-dim">${costRun}/run</span>
        )}
        {costHire !== undefined && (
          <span className="px-2 py-1 rounded border border-border text-dim">hire from ${costHire.toLocaleString()}</span>
        )}
      </div>

      {implementations.length > 0 && (
        <section className="mt-10">
          <div className="text-xs uppercase tracking-wider text-accent mb-3">Run this skill</div>
          <p className="text-dim text-sm mb-4">opengoat doesn&apos;t host execution. Pick a provider:</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {implementations.map((impl, i) => (
              <div key={i} className="rounded-lg border border-border bg-panel p-4">
                <div className="text-ink font-semibold">{impl.provider as string}</div>
                <pre className="mt-2 text-xs mono text-dim leading-relaxed overflow-x-auto">
{Object.entries(impl)
  .filter(([k]) => k !== "provider")
  .map(([k, v]) => `${k}: ${typeof v === "string" ? v : JSON.stringify(v)}`)
  .join("\n")}
                </pre>
              </div>
            ))}
          </div>
        </section>
      )}

      {(whenToUse.length > 0 || whenNotToUse.length > 0) && (
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {whenToUse.length > 0 && (
            <div className="rounded-lg border border-border bg-panel p-5">
              <div className="text-xs uppercase tracking-wider text-accent mb-3">When to use</div>
              <ul className="space-y-1.5 text-ink text-sm">
                {whenToUse.map((s) => (<li key={s}>· {s}</li>))}
              </ul>
            </div>
          )}
          {whenNotToUse.length > 0 && (
            <div className="rounded-lg border border-border bg-panel p-5">
              <div className="text-xs uppercase tracking-wider text-dim mb-3">When NOT to use</div>
              <ul className="space-y-1.5 text-ink text-sm">
                {whenNotToUse.map((s) => (<li key={s}>· {s}</li>))}
              </ul>
            </div>
          )}
        </div>
      )}

      {(prerequisites.length > 0 || outputs.length > 0) && (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {prerequisites.length > 0 && (
            <div className="rounded-lg border border-border bg-panel p-5">
              <div className="text-xs uppercase tracking-wider text-dim mb-3">Prerequisites</div>
              <ul className="space-y-1.5 text-ink text-sm">
                {prerequisites.map((s) => (<li key={s}>· {s}</li>))}
              </ul>
            </div>
          )}
          {outputs.length > 0 && (
            <div className="rounded-lg border border-border bg-panel p-5">
              <div className="text-xs uppercase tracking-wider text-dim mb-3">Outputs</div>
              <ul className="space-y-1.5 text-ink text-sm">
                {outputs.map((s) => (<li key={s}>· {s}</li>))}
              </ul>
            </div>
          )}
        </div>
      )}

      <article className="mt-12">
        <Markdown>{skill.body}</Markdown>
      </article>

      {authorHandle && (
        <section className="mt-12 rounded-lg border border-border bg-panel p-6">
          <div className="text-ink text-lg font-medium">
            {authorType === "human" ? `Hire ${authorName} when this skill isn't enough` : `Built by ${authorName}`}
          </div>
          <p className="text-dim text-sm mt-2">
            {authorType === "human"
              ? "Direct booking. opengoat takes 0%."
              : "Agent built and maintained by a human you can also hire directly."}
          </p>
          {authorBooking ? (
            <a
              href={authorBooking}
              className="inline-block mt-4 px-4 py-2 rounded-md bg-accent text-bg font-medium hover:opacity-90 transition"
            >
              Book a call
            </a>
          ) : (
            <Link
              href={authorType === "agent" ? `/agents/${authorHandle}` : `/humans/${authorHandle}`}
              className="inline-block mt-4 px-4 py-2 rounded-md border border-border hover:border-accent transition"
            >
              See profile
            </Link>
          )}
        </section>
      )}
    </div>
  );
}
