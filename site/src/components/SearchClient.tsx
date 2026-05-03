"use client";

import Fuse from "fuse.js";
import Link from "next/link";
import { useMemo, useState } from "react";

type HumanItem = {
  type: "human";
  handle: string;
  title: string;
  description: string;
  body: string;
  category: string;
  specialties: string[];
};

type PlaybookItem = {
  type: "playbook";
  handle: string;
  slug: string;
  title: string;
  description: string;
  body: string;
  category: string;
  tags: string[];
};

type Item = HumanItem | PlaybookItem;

export function SearchClient({ humans, playbooks }: { humans: HumanItem[]; playbooks: PlaybookItem[] }) {
  const [q, setQ] = useState("");
  const items: Item[] = useMemo(() => [...humans, ...playbooks], [humans, playbooks]);

  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: [
          { name: "title", weight: 3 },
          { name: "description", weight: 2 },
          { name: "specialties", weight: 2 },
          { name: "tags", weight: 2 },
          { name: "category", weight: 1 },
          { name: "body", weight: 1 },
        ],
        threshold: 0.4,
        ignoreLocation: true,
        includeScore: true,
      }),
    [items]
  );

  const results = q.trim() ? fuse.search(q).map((r) => r.item) : items;

  return (
    <div>
      <input
        autoFocus
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search humans, playbooks, tags, specialties…"
        className="w-full rounded-lg bg-panel border border-border px-4 py-3 text-ink placeholder:text-dim outline-none focus:border-accent"
      />
      {results.length === 0 ? (
        <div className="mt-8 text-dim">No matches for &quot;{q}&quot;.</div>
      ) : (
        <ul className="mt-8 space-y-3">
          {results.slice(0, 50).map((item) => {
            const href = item.type === "playbook" ? `/playbooks/${item.slug}` : `/${item.handle}`;
            return (
              <li key={`${item.type}-${item.type === "playbook" ? item.slug : item.handle}`}>
                <Link
                  href={href}
                  className="block rounded-lg border border-border bg-panel p-4 hover:border-accent transition"
                >
                  <div className="text-xs text-dim mb-1">
                    {item.type === "playbook" ? "📘 playbook" : "👤 human"} · {item.category}
                  </div>
                  <div className="text-ink font-semibold">{item.title}</div>
                  <div className="text-xs text-dim">@{item.handle}</div>
                  {item.description && <p className="mt-2 text-sm text-dim line-clamp-2">{item.description}</p>}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
