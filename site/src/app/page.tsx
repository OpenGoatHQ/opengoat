import Link from "next/link";
import { CategoryGrid } from "@/components/CategoryGrid";
import { HumanCard } from "@/components/HumanCard";
import { PlaybookCard } from "@/components/PlaybookCard";
import { allPlaybooks, loadIndex } from "@/lib/data";

export default function Home() {
  const idx = loadIndex();
  const recentHumans = idx.humans.slice(0, 6);
  const recentPlaybooks = allPlaybooks().slice(0, 6);

  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
          <div className="mb-6 inline-block px-3 py-1 rounded-full border border-border text-xs uppercase tracking-wider text-dim">
            Curated · invite-priority · ~50% rejected
          </div>
          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-ink">
            The moat in the agent era<br />isn&apos;t agents.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-dim">
            It&apos;s the humans who operate them. Skills get commoditized. Tools are APIs. What stays
            defensible is the curated network of humans whose judgment, identity, and accumulated reputation
            can&apos;t be forked.
            <span className="text-ink"> opengoat is the registry of those humans.</span>
          </p>
          <p className="mt-4 max-w-2xl text-dim">
            Each operator publishes their real playbooks as skill manifests. Searchable by terminal.
            Callable by AI agents. Bookable by anyone.{" "}
            <span className="text-ink">No take rate.</span>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/search"
              className="px-4 py-2 rounded-md bg-accent text-bg font-medium hover:opacity-90 transition"
            >
              Search humans
            </Link>
            <Link
              href="/manifesto"
              className="px-4 py-2 rounded-md border border-border hover:border-accent hover:text-accent transition"
            >
              Read the manifesto
            </Link>
            <Link
              href="/contribute"
              className="px-4 py-2 rounded-md border border-border hover:border-accent hover:text-accent transition"
            >
              Be listed
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md text-sm">
            <div>
              <div className="text-2xl text-ink font-semibold">{idx.count_humans}</div>
              <div className="text-dim">humans</div>
            </div>
            <div>
              <div className="text-2xl text-ink font-semibold">{idx.count_playbooks}</div>
              <div className="text-dim">playbooks</div>
            </div>
            <div>
              <div className="text-2xl text-ink font-semibold">13</div>
              <div className="text-dim">categories</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-2xl font-semibold text-ink">Categories</h2>
            <Link href="/search" className="text-sm text-dim hover:text-ink transition">browse all →</Link>
          </div>
          <CategoryGrid />
        </div>
      </section>

      {recentHumans.length > 0 && (
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
            <h2 className="text-2xl font-semibold text-ink mb-6">Recently joined</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {recentHumans.map((h) => (
                <HumanCard key={h.handle} human={h} />
              ))}
            </div>
          </div>
        </section>
      )}

      {recentPlaybooks.length > 0 && (
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
            <h2 className="text-2xl font-semibold text-ink mb-6">Latest playbooks</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {recentPlaybooks.map(({ playbook, author }) => (
                <PlaybookCard key={playbook.slug} playbook={playbook} author={author} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
          <h2 className="text-2xl font-semibold text-ink mb-6">For builders</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/cli"
              className="block rounded-lg border border-border bg-panel p-6 hover:border-accent transition"
            >
              <div className="text-xs text-dim mb-2">CLI</div>
              <div className="text-ink font-semibold">From your terminal</div>
              <pre className="mt-3 text-sm mono text-dim">
{`npm i -g open-goat
opengoat search "cold email"`}
              </pre>
            </Link>
            <Link
              href="/mcp"
              className="block rounded-lg border border-border bg-panel p-6 hover:border-accent transition"
            >
              <div className="text-xs text-dim mb-2">MCP</div>
              <div className="text-ink font-semibold">From your AI agent</div>
              <pre className="mt-3 text-sm mono text-dim">
{`npm i -g opengoat-mcp
# wire to Claude / Cursor / Codex`}
              </pre>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
