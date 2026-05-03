import Link from "next/link";
import type { Human } from "@/lib/data";
import { formatRate, specialties, statusLabel } from "@/lib/format";

export function HumanCard({ human }: { human: Human }) {
  const name = human.profile.name || human.handle;
  const tagline = (human.profile_body.split("\n").find((l) => l.trim() && !l.startsWith("#")) || "").trim();
  return (
    <Link
      href={`/${human.handle}`}
      className="block rounded-lg border border-border bg-panel p-5 hover:border-accent transition"
    >
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <div className="text-ink font-semibold">{name}</div>
          <div className="text-xs text-dim">@{human.handle} · {human.category}</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-dim">{formatRate(human.profile)}</div>
          <div className="text-xs">
            <span className={human.profile.accepting_bookings ? "text-accent" : "text-dim"}>
              {statusLabel(human.profile)}
            </span>
          </div>
        </div>
      </div>
      {tagline && <p className="mt-3 text-sm text-dim line-clamp-2">{tagline}</p>}
      <div className="mt-3 flex flex-wrap gap-1">
        {specialties(human.profile).slice(0, 4).map((s) => (
          <span key={s} className="text-xs px-2 py-0.5 rounded border border-border text-dim">
            {s}
          </span>
        ))}
      </div>
    </Link>
  );
}
