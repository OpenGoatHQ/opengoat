import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES, categoryBySlug } from "@/lib/categories";
import { agentsByCategory, humansByCategory, skillsByCategory } from "@/lib/data";
import { HumanCard } from "@/components/HumanCard";
import { AgentCard } from "@/components/AgentCard";
import { SkillCard } from "@/components/SkillCard";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const c = categoryBySlug(category);
  if (!c) return { title: "Not found" };
  return {
    title: c.name,
    description: `${c.name} on opengoat. ${c.blurb}.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const c = categoryBySlug(category);
  if (!c) notFound();
  const humans = humansByCategory(c.slug);
  const agents = agentsByCategory(c.slug);
  const skills = skillsByCategory(c.slug);

  const total = humans.length + agents.length + skills.length;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <h1 className="text-4xl font-semibold tracking-tight text-ink">{c.name}</h1>
      <p className="mt-3 text-dim text-lg">{c.blurb}</p>
      <div className="mt-2 text-dim text-sm">
        {humans.length} humans · {agents.length} agents · {skills.length} skills
      </div>

      <div className="mt-10 space-y-12">
        {total === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-panel p-10 text-center">
            <div className="text-ink font-medium">Empty category.</div>
            <p className="text-dim text-sm mt-2 max-w-md mx-auto">
              opengoat is in early days. If you operate (or build agents, or author skills) at the top
              of this category and have shipped real work, get listed.
            </p>
            <Link
              href="/contribute"
              className="inline-block mt-4 px-4 py-2 rounded-md border border-border hover:border-accent transition"
            >
              How to be listed
            </Link>
          </div>
        ) : (
          <>
            {humans.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-ink mb-4">Humans</h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {humans.map((h) => (<HumanCard key={h.handle} human={h} />))}
                </div>
              </section>
            )}
            {agents.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-ink mb-4">Agents</h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {agents.map((a) => (<AgentCard key={a.handle} agent={a} />))}
                </div>
              </section>
            )}
            {skills.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-ink mb-4">Skills</h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {skills.map((s) => (<SkillCard key={s.slug} skill={s} />))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}
