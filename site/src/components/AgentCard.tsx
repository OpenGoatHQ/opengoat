import Link from "next/link";
import type { Agent } from "@/lib/data";
import { asArray } from "@/lib/format";

export function AgentCard({ agent }: { agent: Agent }) {
  const name = (agent.profile.name as string) || agent.handle;
  const builder = agent.profile.builder as string | undefined;
  const price = agent.profile.price_per_call_usd as number | undefined;
  const accepting = !!agent.profile.accepting_calls;
  const specialties = asArray(agent.profile.specialties);
  return (
    <Link
      href={`/agents/${agent.handle}`}
      className="block rounded-lg border border-border bg-panel p-5 hover:border-accent transition"
    >
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <div className="text-ink font-semibold">{name}</div>
          <div className="text-xs text-dim">@{agent.handle} · agent</div>
        </div>
        <div className="text-right text-xs text-dim">
          {price !== undefined && <div>${price}/call</div>}
          <div className={accepting ? "text-accent" : ""}>{accepting ? "open" : "full"}</div>
        </div>
      </div>
      {builder && (
        <div className="mt-2 text-xs text-dim">built by @{builder}</div>
      )}
      <div className="mt-3 flex flex-wrap gap-1">
        {specialties.slice(0, 4).map((s) => (
          <span key={s} className="text-xs px-2 py-0.5 rounded border border-border text-dim">
            {s}
          </span>
        ))}
      </div>
    </Link>
  );
}
