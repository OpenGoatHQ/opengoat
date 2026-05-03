import type { Metadata } from "next";
import { allPlaybooks, loadIndex } from "@/lib/data";
import { SearchClient } from "@/components/SearchClient";

export const metadata: Metadata = {
  title: "Search",
  description: "Search opengoat humans and playbooks.",
};

export default function SearchPage() {
  const idx = loadIndex();
  const playbooks = allPlaybooks().map(({ playbook, author }) => ({
    type: "playbook" as const,
    handle: author.handle,
    slug: playbook.slug,
    title: (playbook.frontmatter.name as string) || playbook.slug,
    description: (playbook.frontmatter.description as string) || "",
    body: playbook.body,
    category: playbook.category,
    tags: Array.isArray(playbook.frontmatter.tags) ? playbook.frontmatter.tags : [],
  }));
  const humans = idx.humans.map((h) => ({
    type: "human" as const,
    handle: h.handle,
    title: (h.profile.name as string) || h.handle,
    description: h.profile_body.slice(0, 200),
    body: h.profile_body,
    category: h.category,
    specialties: Array.isArray(h.profile.specialties) ? h.profile.specialties : [],
  }));

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight text-ink">Search</h1>
      <p className="mt-2 text-dim">
        Across {humans.length} {humans.length === 1 ? "human" : "humans"} and {playbooks.length}{" "}
        {playbooks.length === 1 ? "playbook" : "playbooks"}.
      </p>
      <div className="mt-8">
        <SearchClient humans={humans} playbooks={playbooks} />
      </div>
    </div>
  );
}
