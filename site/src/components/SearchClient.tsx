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

type AgentItem = {
  type: "agent";
  handle: string;
  title: string;
  description: string;
  body: string;
  category: string;
  specialties: string[];
};

type SkillItem = {
  type: "skill";
  slug: string;
  handle: string;
  title: string;
  description: string;
  body: string;
  category: string;
  tags: string[];
};

type Item = HumanItem | AgentItem | SkillItem;

export function SearchClient({
  humans,
  agents,
  skills,
}: {
  humans: HumanItem[];
  agents: AgentItem[];
  skills: SkillItem[];
}) {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "human" | "agent" | "skill">("all");

  const items: Item[] = useMemo(() => [...humans, ...agents, ...skills], [humans, agents, skills]);

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

  const searched = q.trim() ? fuse.search(q).map((r) => r.item) : items;
  const results = filter === "all" ? searched : searched.filter((i) => i.type === filter);

  function hrefFor(item: Item): string {
    if (item.type === "skill") return `/skills/${item.slug}`;
    if (item.type === "agent") return `/agents/${item.handle}`;
    return `/humans/${item.handle}`;
  }

  function badgeFor(item: Item): string {
    if (item.type === "skill") return "📘 skill";
    if (item.type === "agent") return "🤖 agent";
    return "👤 human";
  }

  return (
    <div>
      <input
        autoFocus
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search humans, agents, skills, tags…"
        className="w-full rounded-lg bg-panel border border-border px-4 py-3 text-ink placeholder:text-dim outline-none focus:border-accent"
      />
      <div className="mt-3 flex flex-wrap gap-2 text-sm">
        {(["all", "human", "agent", "skill"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-md border ${
              filter === f
                ? "border-accent text-accent"
                : "border-border text-dim hover:text-ink hover:border-ink"
            } transition`}
          >
            {f}
          </button>
        ))}
      </div>
      {results.length === 0 ? (
        <div className="mt-8 text-dim">No matches.</div>
      ) : (
        <ul className="mt-8 space-y-3">
          {results.slice(0, 50).map((item) => (
            <li key={`${item.type}-${item.type === "skill" ? item.slug : item.handle}`}>
              <Link
                href={hrefFor(item)}
                className="block rounded-lg border border-border bg-panel p-4 hover:border-accent transition"
              >
                <div className="text-xs text-dim mb-1">
                  {badgeFor(item)} · {item.category}
                </div>
                <div className="text-ink font-semibold">{item.title}</div>
                {item.handle && <div className="text-xs text-dim">@{item.handle}</div>}
                {item.description && <p className="mt-2 text-sm text-dim line-clamp-2">{item.description}</p>}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
