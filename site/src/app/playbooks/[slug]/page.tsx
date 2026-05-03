import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { allSlugs, getPlaybook } from "@/lib/data";
import { Markdown } from "@/components/Markdown";
import { asArray, ensureUrl } from "@/lib/format";

export function generateStaticParams() {
  return allSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const found = getPlaybook(slug);
  if (!found) return { title: "Not found" };
  const { playbook } = found;
  const title =
    (playbook.frontmatter.name as string) ||
    (playbook.frontmatter.title as string) ||
    playbook.slug;
  const description = (playbook.frontmatter.description as string) || `Playbook by @${playbook.author}`;
  return { title, description };
}

export default async function PlaybookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const found = getPlaybook(slug);
  if (!found) notFound();
  const { playbook, author } = found;

  const title =
    (playbook.frontmatter.name as string) ||
    (playbook.frontmatter.title as string) ||
    playbook.slug;
  const description = (playbook.frontmatter.description as string) || "";
  const whenToUse = asArray(playbook.frontmatter.when_to_use);
  const whenNotToUse = asArray(playbook.frontmatter.when_not_to_use);
  const prerequisites = asArray(playbook.frontmatter.prerequisites);
  const outputs = asArray(playbook.frontmatter.outputs);
  const duration = playbook.frontmatter.duration as string | undefined;
  const difficulty = playbook.frontmatter.difficulty as string | undefined;
  const humanRequired = playbook.frontmatter.human_required as boolean | undefined;
  const costMin = playbook.frontmatter.cost_hire_min_usd as number | undefined;
  const costMax = playbook.frontmatter.cost_hire_max_usd as number | undefined;
  const booking = ensureUrl(author.profile.booking_url);
  const authorName = (author.profile.name as string) || author.handle;
  const runnable = playbook.frontmatter.runnable as Record<string, any> | undefined;

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <div className="text-sm text-dim mb-3">
        <Link href={`/c/${playbook.category}`} className="hover:text-ink">{playbook.category}</Link>
      </div>
      <h1 className="text-4xl font-semibold tracking-tight text-ink">{title}</h1>
      <div className="mt-2 text-dim">
        by <Link href={`/${author.handle}`} className="text-ink hover:text-accent">@{author.handle}</Link>
      </div>
      {description && <p className="mt-4 text-lg text-ink/90">{description}</p>}

      <div className="mt-6 flex flex-wrap gap-2 text-xs">
        {duration && <span className="px-2 py-1 rounded border border-border text-dim">⏱ {duration}</span>}
        {difficulty && <span className="px-2 py-1 rounded border border-border text-dim">{difficulty}</span>}
        {humanRequired !== undefined && (
          <span className="px-2 py-1 rounded border border-border text-dim">
            {humanRequired ? "human required" : "agent-executable"}
          </span>
        )}
        {costMin && (
          <span className="px-2 py-1 rounded border border-border text-dim">
            from ${costMin.toLocaleString()}{costMax ? `–$${costMax.toLocaleString()}` : ""}
          </span>
        )}
      </div>

      {runnable && (
        <section className="mt-10 rounded-lg border border-accent/50 bg-panel p-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="text-xs uppercase tracking-wider text-accent mb-2">Runnable skill</div>
              <div className="text-ink font-semibold text-lg">
                Run via {runnable.via}
                {typeof runnable.cost_per_run_usd === "number" && (
                  <span className="text-dim font-normal text-base"> · ${runnable.cost_per_run_usd}/run</span>
                )}
              </div>
              <p className="text-dim text-sm mt-1">
                {runnable.via === "orthogonal" && (
                  <>Calls <code className="text-ink">api.orthogonal.com/v1/run</code> with <code className="text-ink">{String(runnable.api)}{String(runnable.path || "")}</code>. Bring your orthogonal API key.</>
                )}
                {runnable.via === "http" && (
                  <>Calls <code className="text-ink">{String(runnable.endpoint)}</code> directly. Operator-managed infra.</>
                )}
                {runnable.via === "mcp" && (
                  <>MCP server <code className="text-ink">{String(runnable.server)}</code>, tool <code className="text-ink">{String(runnable.tool)}</code>. Install and run via your agent.</>
                )}
              </p>
            </div>
            <code className="text-xs px-2 py-1 rounded bg-black border border-border text-dim mono">
              goat run {playbook.slug}
            </code>
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
        <Markdown>{playbook.body}</Markdown>
      </article>

      <section className="mt-12 rounded-lg border border-border bg-panel p-6">
        <div className="text-ink text-lg font-medium">Hire {authorName} to do this</div>
        <p className="text-dim text-sm mt-2">
          Direct booking. opengoat takes 0%.{author.goat && (
            <> Read <Link href={`/${author.handle}#why`} className="text-accent hover:underline">why {authorName} beats running this skill alone</Link>.</>
          )}
        </p>
        {booking ? (
          <a
            href={booking}
            className="inline-block mt-4 px-4 py-2 rounded-md bg-accent text-bg font-medium hover:opacity-90 transition"
          >
            Book a call
          </a>
        ) : (
          <Link
            href={`/${author.handle}`}
            className="inline-block mt-4 px-4 py-2 rounded-md border border-border hover:border-accent transition"
          >
            See profile
          </Link>
        )}
      </section>
    </div>
  );
}
