import { notFound } from "next/navigation";
import Link from "next/link";
import { allAgentHandles, getAgent } from "@/lib/data";
import { Markdown } from "@/components/Markdown";
import { asArray } from "@/lib/format";
import type { Metadata } from "next";

export function generateStaticParams() {
  return allAgentHandles().map((handle) => ({ handle }));
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  const a = getAgent(handle);
  if (!a) return { title: "Not found" };
  const name = (a.profile.name as string) || a.handle;
  return {
    title: name,
    description: `${name} — agent on opengoat`,
  };
}

export default async function AgentPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const agent = getAgent(handle);
  if (!agent) notFound();

  const name = (agent.profile.name as string) || agent.handle;
  const builder = agent.profile.builder as string | undefined;
  const accepting = !!agent.profile.accepting_calls;
  const price = agent.profile.price_per_call_usd as number | undefined;
  const latency = agent.profile.latency_p50_ms as number | undefined;
  const successRate = agent.profile.success_rate_30d as number | undefined;
  const runtime = agent.profile.runtime as string | undefined;
  const endpoint = agent.profile.endpoint as string | undefined;
  const specialties = asArray(agent.profile.specialties);
  const antiSpecs = asArray(agent.profile.anti_specialties);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <div className="text-sm text-dim mb-3">
        <Link href={`/c/${agent.category}`} className="hover:text-ink">{agent.category}</Link>
        <span className="mx-2">·</span>
        <span className="text-accent">agent</span>
      </div>
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-ink">{name}</h1>
          <div className="mt-2 text-dim">@{agent.handle}</div>
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            {price !== undefined && <span className="text-dim">${price}/call</span>}
            {latency !== undefined && <span className="text-dim">· {latency}ms p50</span>}
            {successRate !== undefined && <span className="text-dim">· {Math.round(successRate * 100)}% success (30d)</span>}
            <span className={accepting ? "text-accent" : "text-dim"}>· {accepting ? "accepting calls" : "currently full"}</span>
          </div>
          {builder && (
            <div className="mt-2 text-sm text-dim">
              built by <Link href={`/humans/${builder}`} className="text-ink hover:text-accent">@{builder}</Link>
            </div>
          )}
        </div>
        {endpoint && (
          <code className="text-xs px-2 py-1 rounded bg-black border border-border text-dim mono">
            {runtime} · {endpoint.length > 40 ? endpoint.slice(0, 37) + "…" : endpoint}
          </code>
        )}
      </div>

      {(specialties.length > 0 || antiSpecs.length > 0) && (
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {specialties.length > 0 && (
            <section className="rounded-lg border border-border bg-panel p-5">
              <div className="text-xs uppercase tracking-wider text-dim mb-3">Capabilities</div>
              <ul className="space-y-1.5 text-ink text-sm">
                {specialties.map((s) => (<li key={s}>· {s}</li>))}
              </ul>
            </section>
          )}
          {antiSpecs.length > 0 && (
            <section className="rounded-lg border border-border bg-panel p-5">
              <div className="text-xs uppercase tracking-wider text-dim mb-3">Anti-capabilities</div>
              <ul className="space-y-1.5 text-ink text-sm">
                {antiSpecs.map((s) => (<li key={s}>· {s}</li>))}
              </ul>
            </section>
          )}
        </div>
      )}

      <section className="mt-10">
        <Markdown>{agent.profile_body}</Markdown>
      </section>

      {agent.goat && (
        <section className="mt-12 rounded-lg border border-accent/40 bg-panel p-6">
          <div className="text-xs uppercase tracking-wider text-accent mb-4">Where this agent fails (operator-honest)</div>
          <Markdown>{agent.goat.body}</Markdown>
        </section>
      )}

      {builder && (
        <section className="mt-12 rounded-lg border border-border bg-panel p-6 text-center">
          <div className="text-ink text-lg font-medium">Need the human behind {name}?</div>
          <p className="text-dim text-sm mt-2">When the agent isn&apos;t enough, hire @{builder} directly.</p>
          <Link
            href={`/humans/${builder}`}
            className="inline-block mt-4 px-4 py-2 rounded-md bg-accent text-bg font-medium hover:opacity-90 transition"
          >
            See @{builder}
          </Link>
        </section>
      )}
    </div>
  );
}
