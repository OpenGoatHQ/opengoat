import type { Metadata } from "next";
import { loadIndex } from "@/lib/data";
import { SearchClient } from "@/components/SearchClient";

export const metadata: Metadata = {
  title: "Search",
  description: "Search opengoat humans, agents, and skills.",
};

export default function SearchPage() {
  const idx = loadIndex();

  const humans = idx.humans.map((h) => ({
    type: "human" as const,
    handle: h.handle,
    title: (h.profile.name as string) || h.handle,
    description: h.profile_body.slice(0, 200),
    body: h.profile_body,
    category: h.category,
    specialties: Array.isArray(h.profile.specialties) ? h.profile.specialties : [],
  }));

  const agents = idx.agents.map((a) => ({
    type: "agent" as const,
    handle: a.handle,
    title: (a.profile.name as string) || a.handle,
    description: a.profile_body.slice(0, 200),
    body: a.profile_body,
    category: a.category,
    specialties: Array.isArray(a.profile.specialties) ? a.profile.specialties : [],
  }));

  const skills = idx.skills.map((s) => ({
    type: "skill" as const,
    slug: s.slug,
    handle: (s.frontmatter.author as string) || "",
    title: (s.frontmatter.name as string) || s.slug,
    description: (s.frontmatter.description as string) || "",
    body: s.body,
    category: (s.frontmatter.category as string) || "",
    tags: Array.isArray(s.frontmatter.tags) ? s.frontmatter.tags : [],
  }));

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight text-ink">Search</h1>
      <p className="mt-2 text-dim">
        Across {humans.length} humans, {agents.length} agents, and {skills.length} skills.
      </p>
      <div className="mt-8">
        <SearchClient humans={humans} agents={agents} skills={skills} />
      </div>
    </div>
  );
}
