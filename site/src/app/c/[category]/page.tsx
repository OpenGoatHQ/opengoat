import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CATEGORIES, categoryBySlug } from "@/lib/categories";
import { humansByCategory } from "@/lib/data";
import { HumanCard } from "@/components/HumanCard";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const c = categoryBySlug(category);
  if (!c) return { title: "Not found" };
  return {
    title: c.name,
    description: `${c.name} operators on opengoat. ${c.blurb}.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const c = categoryBySlug(category);
  if (!c) notFound();
  const humans = humansByCategory(c.slug);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <h1 className="text-4xl font-semibold tracking-tight text-ink">{c.name}</h1>
      <p className="mt-3 text-dim text-lg">{c.blurb}</p>
      <div className="mt-2 text-dim text-sm">
        {humans.length} {humans.length === 1 ? "operator" : "operators"}
      </div>

      <div className="mt-10">
        {humans.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-panel p-10 text-center">
            <div className="text-ink font-medium">No operators here yet.</div>
            <p className="text-dim text-sm mt-2 max-w-md mx-auto">
              opengoat is in early days. If you operate at the top of this category and have shipped real
              work, get listed. Vetted submissions reviewed within 7 days.
            </p>
            <a
              href="https://github.com/OpenGoatHQ/opengoat/blob/main/CONTRIBUTING.md"
              className="inline-block mt-4 px-4 py-2 rounded-md border border-border hover:border-accent transition"
            >
              How to be listed
            </a>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {humans.map((h) => (<HumanCard key={h.handle} human={h} />))}
          </div>
        )}
      </div>
    </div>
  );
}
