import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { loadIndex } from "@/lib/data";

export function CategoryGrid() {
  const idx = loadIndex();
  const counts: Record<string, number> = {};
  for (const h of idx.humans) counts[h.category] = (counts[h.category] || 0) + 1;

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {CATEGORIES.map((c) => {
        const n = counts[c.slug] || 0;
        return (
          <Link
            key={c.slug}
            href={`/c/${c.slug}`}
            className="block rounded-lg border border-border bg-panel p-4 hover:border-accent transition group"
          >
            <div className="flex items-baseline justify-between">
              <span className="text-ink font-medium">{c.name}</span>
              <span className="text-dim text-xs">{n} {n === 1 ? "human" : "humans"}</span>
            </div>
            <p className="mt-1 text-sm text-dim">{c.blurb}</p>
          </Link>
        );
      })}
    </div>
  );
}
