import { notFound } from "next/navigation";
import Link from "next/link";
import { allHumanHandles, getHuman, skillsByAuthor } from "@/lib/data";
import { Markdown } from "@/components/Markdown";
import { antiSpecialties, formatRate, specialties, statusLabel, ensureUrl } from "@/lib/format";
import { SkillCard } from "@/components/SkillCard";
import type { Metadata } from "next";

export function generateStaticParams() {
  return allHumanHandles().map((handle) => ({ handle }));
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  const h = getHuman(handle);
  if (!h) return { title: "Not found" };
  const name = (h.profile.name as string) || h.handle;
  const tagline = (h.profile_body.split("\n").find((l) => l.trim() && !l.startsWith("#")) || "").trim();
  return {
    title: name,
    description: tagline || `${name} — operator on opengoat`,
  };
}

export default async function HumanPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const human = getHuman(handle);
  if (!human) notFound();

  const name = (human.profile.name as string) || human.handle;
  const booking = ensureUrl(human.profile.booking_url);
  const open = !!human.profile.accepting_bookings;
  const skills = skillsByAuthor(human.handle);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <div className="text-sm text-dim mb-3">
        <Link href={`/c/${human.category}`} className="hover:text-ink">{human.category}</Link>
        <span className="mx-2">·</span>
        <span className="text-accent">human</span>
      </div>
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-ink">{name}</h1>
          <div className="mt-2 text-dim">@{human.handle}</div>
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            <span className="text-dim">{formatRate(human.profile)}</span>
            <span className={open ? "text-accent" : "text-dim"}>· {statusLabel(human.profile)}</span>
            {human.profile.location && <span className="text-dim">· {human.profile.location}</span>}
          </div>
        </div>
        {booking && open && (
          <a
            href={booking}
            className="px-4 py-2 rounded-md bg-accent text-bg font-medium hover:opacity-90 transition"
          >
            Book a call
          </a>
        )}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {specialties(human.profile).length > 0 && (
          <section className="rounded-lg border border-border bg-panel p-5">
            <div className="text-xs uppercase tracking-wider text-dim mb-3">Rent for</div>
            <ul className="space-y-1.5 text-ink text-sm">
              {specialties(human.profile).map((s) => (<li key={s}>· {s}</li>))}
            </ul>
          </section>
        )}
        {antiSpecialties(human.profile).length > 0 && (
          <section className="rounded-lg border border-border bg-panel p-5">
            <div className="text-xs uppercase tracking-wider text-dim mb-3">Anti-specialties</div>
            <ul className="space-y-1.5 text-ink text-sm">
              {antiSpecialties(human.profile).map((s) => (<li key={s}>· {s}</li>))}
            </ul>
          </section>
        )}
      </div>

      <section className="mt-10">
        <Markdown>{human.profile_body}</Markdown>
      </section>

      {human.goat && (
        <section className="mt-12 rounded-lg border border-accent/40 bg-panel p-6">
          <div className="text-xs uppercase tracking-wider text-accent mb-4">Why hire {name} beyond their skills</div>
          <Markdown>{human.goat.body}</Markdown>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-ink mb-4">Skills authored</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {skills.map((s) => (<SkillCard key={s.slug} skill={s} />))}
          </div>
        </section>
      )}

      {booking && (
        <section className="mt-12 rounded-lg border border-border bg-panel p-6 text-center">
          <div className="text-ink text-lg font-medium">Hire {name}</div>
          <p className="text-dim text-sm mt-2">Direct booking. opengoat takes 0%.</p>
          <a
            href={booking}
            className="inline-block mt-4 px-4 py-2 rounded-md bg-accent text-bg font-medium hover:opacity-90 transition"
          >
            {open ? "Book a call" : "View calendar"}
          </a>
        </section>
      )}
    </div>
  );
}
