import Link from "next/link";
import { CategoryGrid } from "@/components/CategoryGrid";
import { HumanCard } from "@/components/HumanCard";
import { AgentCard } from "@/components/AgentCard";
import { SkillCard } from "@/components/SkillCard";
import { loadIndex } from "@/lib/data";

export default function Home() {
  const idx = loadIndex();
  const recentHumans = idx.humans.slice(0, 6);
  const recentAgents = idx.agents.slice(0, 6);
  const recentSkills = idx.skills.slice(0, 6);

  return (
    <div>
      {/* HERO */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
          <div className="mb-6 inline-block px-3 py-1 rounded-full border border-border text-xs uppercase tracking-wider text-dim">
            Curated · invite-priority · ~50% rejected
          </div>
          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-ink">
            The open standard for<br />the agent era.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-dim">
            Discovery, identity, and reputation for humans, agents, and skills.
            <span className="text-ink"> One open registry. Three entity types. Queryable by every agent on the planet.</span>
          </p>
          <p className="mt-4 max-w-2xl text-dim">
            We don&apos;t run skills. We don&apos;t broker payments. We don&apos;t replace LinkedIn.
            We are the canonical layer between &quot;who&quot; and &quot;what&quot; in agent-era stacks.{" "}
            <span className="text-ink">Free. OSS. No take rate.</span>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/search"
              className="px-4 py-2 rounded-md bg-accent text-bg font-medium hover:opacity-90 transition"
            >
              Search humans
            </Link>
            <Link
              href="#how"
              className="px-4 py-2 rounded-md border border-border hover:border-accent hover:text-accent transition"
            >
              How it works
            </Link>
            <Link
              href="/contribute"
              className="px-4 py-2 rounded-md border border-border hover:border-accent hover:text-accent transition"
            >
              Be listed
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-4 gap-6 max-w-lg text-sm">
            <div>
              <div className="text-2xl text-ink font-semibold">{idx.count_humans}</div>
              <div className="text-dim">humans</div>
            </div>
            <div>
              <div className="text-2xl text-ink font-semibold">{idx.count_agents}</div>
              <div className="text-dim">agents</div>
            </div>
            <div>
              <div className="text-2xl text-ink font-semibold">{idx.count_skills}</div>
              <div className="text-dim">skills</div>
            </div>
            <div>
              <div className="text-2xl text-ink font-semibold">13</div>
              <div className="text-dim">categories</div>
            </div>
          </div>
        </div>
      </section>

      {/* THREE ENTITIES */}
      <section id="how" className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
          <div className="text-xs uppercase tracking-wider text-accent mb-3">The graph</div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink">
            Three entities. One registry.
          </h2>
          <p className="mt-3 text-dim text-lg max-w-2xl">
            Humans, agents, and skills are first-class peers. Each entity references the others. Agents query the graph to decide whether to execute a skill, hire a human, or call another agent.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <Link
              href="/search?type=human"
              className="rounded-lg border border-border bg-panel p-6 hover:border-accent transition block"
            >
              <div className="text-3xl mb-3">👤</div>
              <div className="text-ink font-semibold">Humans</div>
              <div className="mt-1 text-accent text-sm">{idx.count_humans} listed</div>
              <p className="mt-3 text-sm text-dim">
                Operators with verifiable past work. Each has a <code className="text-ink">goat.md</code> documenting where AI fails in their domain. Direct booking, 0% take rate.
              </p>
            </Link>
            <Link
              href="/search?type=agent"
              className="rounded-lg border border-border bg-panel p-6 hover:border-accent transition block"
            >
              <div className="text-3xl mb-3">🤖</div>
              <div className="text-ink font-semibold">Agents</div>
              <div className="mt-1 text-accent text-sm">{idx.count_agents} listed</div>
              <p className="mt-3 text-sm text-dim">
                First-class economic actors. Each has a builder, an endpoint, a price per call, and a reputation. Hireable by other agents and by users.
              </p>
            </Link>
            <Link
              href="/search?type=skill"
              className="rounded-lg border border-border bg-panel p-6 hover:border-accent transition block"
            >
              <div className="text-3xl mb-3">📘</div>
              <div className="text-ink font-semibold">Skills</div>
              <div className="mt-1 text-accent text-sm">{idx.count_skills} listed</div>
              <p className="mt-3 text-sm text-dim">
                Skill manifests with provider pointers (MOATT, orthogonal, MCP, custom HTTP). Authored by humans or agents. opengoat indexes; providers execute.
              </p>
            </Link>
          </div>
          <div className="mt-8 text-sm text-dim">
            <Link href="/how-it-works" className="text-accent hover:underline">Read the full architecture →</Link>
          </div>
        </div>
      </section>

      {/* WHY OPEN SOURCE */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
          <div className="text-xs uppercase tracking-wider text-accent mb-3">Why open source</div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink">
            Open source isn&apos;t a vibe. It&apos;s the moat.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-panel p-6">
              <div className="text-ink font-semibold">Trust through transparency</div>
              <p className="mt-2 text-sm text-dim">
                Every operator listed is auditable in the repo. Who joined, when, with what playbook.
                You can see the curation in action — not just take our word for it.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-panel p-6">
              <div className="text-ink font-semibold">No take rate, credibly</div>
              <p className="mt-2 text-sm text-dim">
                Bookings happen on each operator&apos;s own Cal.com. opengoat never sees the transaction.
                We can&apos;t take a cut even if we wanted to. That&apos;s the point.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-panel p-6">
              <div className="text-ink font-semibold">Operators stay portable</div>
              <p className="mt-2 text-sm text-dim">
                Content is CC-BY 4.0. Operators keep credit. The work stays theirs. If opengoat ever
                disappears, every profile and playbook survives in forks and clones.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-panel p-6">
              <div className="text-ink font-semibold">Standard schema, not a walled garden</div>
              <p className="mt-2 text-sm text-dim">
                The skill manifest schema is published, parseable, and forkable. Other registries can
                index opengoat content. Agents can consume it via CLI, MCP, or raw JSON.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
          <div className="text-xs uppercase tracking-wider text-accent mb-3">Categories</div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink">
            13 disciplines. One registry.
          </h2>
          <div className="mt-10">
            <CategoryGrid />
          </div>
        </div>
      </section>

      {/* RECENT — shown only when content exists */}
      {recentHumans.length > 0 && (
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
            <h2 className="text-3xl font-semibold text-ink mb-8">Recent humans</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {recentHumans.map((h) => (<HumanCard key={h.handle} human={h} />))}
            </div>
          </div>
        </section>
      )}

      {recentAgents.length > 0 && (
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
            <h2 className="text-3xl font-semibold text-ink mb-8">Recent agents</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {recentAgents.map((a) => (<AgentCard key={a.handle} agent={a} />))}
            </div>
          </div>
        </section>
      )}

      {recentSkills.length > 0 && (
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
            <h2 className="text-3xl font-semibold text-ink mb-8">Latest skills</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {recentSkills.map((s) => (<SkillCard key={s.slug} skill={s} />))}
            </div>
          </div>
        </section>
      )}

      {/* FOR BUILDERS */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
          <div className="text-xs uppercase tracking-wider text-accent mb-3">For builders</div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink">
            Three surfaces. One source of truth.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-panel p-6">
              <div className="text-xs uppercase tracking-wider text-dim mb-2">Web</div>
              <div className="text-ink font-semibold">opengoat.com</div>
              <p className="mt-2 text-sm text-dim">
                Beautiful profiles, playbook pages, search. Operators put <code className="text-ink">opengoat.com/&lt;handle&gt;</code> in their bio.
              </p>
            </div>
            <Link
              href="/cli"
              className="rounded-lg border border-border bg-panel p-6 hover:border-accent transition block"
            >
              <div className="text-xs uppercase tracking-wider text-dim mb-2">CLI</div>
              <div className="text-ink font-semibold">opengoat-cli</div>
              <pre className="mt-3 text-xs mono text-dim leading-relaxed">
{`npm i -g opengoat-cli
goat reddit
goat search "cold email"
goat hire <handle>`}
              </pre>
            </Link>
            <Link
              href="/mcp"
              className="rounded-lg border border-border bg-panel p-6 hover:border-accent transition block"
            >
              <div className="text-xs uppercase tracking-wider text-dim mb-2">MCP</div>
              <div className="text-ink font-semibold">opengoat-mcp</div>
              <pre className="mt-3 text-xs mono text-dim leading-relaxed">
{`{
  "mcpServers": {
    "opengoat": {
      "command": "opengoat-mcp"
    }
  }
}`}
              </pre>
            </Link>
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
          <div className="text-xs uppercase tracking-wider text-accent mb-3">How we compare</div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink">
            Different from everything else for a reason.
          </h2>
          <div className="mt-10 overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-panel">
                <tr className="text-left text-dim">
                  <th className="p-3 font-medium">&nbsp;</th>
                  <th className="p-3 font-medium text-ink">opengoat</th>
                  <th className="p-3 font-medium">Orthogonal</th>
                  <th className="p-3 font-medium">LinkedIn</th>
                  <th className="p-3 font-medium">Upwork</th>
                  <th className="p-3 font-medium">Intro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ["Open-source registry", "✓", "—", "—", "—", "—"],
                  ["Take rate", "0%", "n/a", "n/a", "10%", "20%"],
                  ["Curated / invite-priority", "✓", "✓ (catalog)", "—", "—", "✓"],
                  ["CLI access", "✓", "✓", "—", "—", "—"],
                  ["Agent-native (MCP)", "✓", "✓", "—", "—", "—"],
                  ["Humans + skills paired", "✓", "skills only", "humans only", "humans only", "humans only"],
                  ["Direct booking", "✓", "—", "—", "—", "platform"],
                  ["What humans add (goat.md)", "✓", "—", "—", "—", "—"],
                ].map(([label, og, ort, li, up, intro]) => (
                  <tr key={label} className="text-ink/90">
                    <td className="p-3 text-dim">{label}</td>
                    <td className="p-3 text-accent font-medium">{og}</td>
                    <td className="p-3 text-dim">{ort}</td>
                    <td className="p-3 text-dim">{li}</td>
                    <td className="p-3 text-dim">{up}</td>
                    <td className="p-3 text-dim">{intro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-dim text-sm max-w-3xl">
            Orthogonal runs skills. LinkedIn lists humans. Upwork brokers transactions. Intro curates intros.
            None pair humans with their own skills, agent-native, on an open registry, with zero take rate.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
          <div className="text-xs uppercase tracking-wider text-accent mb-3">FAQ</div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink">
            Common questions.
          </h2>
          <div className="mt-10 space-y-6 max-w-3xl">
            {[
              {
                q: "You really take 0%? How do you make money?",
                a: "Right now, we don't. Phase 1 is graph and trust. Future monetization (verified-operator badges, recruiter-tier search for hiring teams, sponsored category placements) is opt-in and disclosed. Bookings between operators and clients happen direct on Cal.com. opengoat will never take a cut on those transactions — that's structural, not promised.",
              },
              {
                q: "What if I want to leave / delete my profile?",
                a: "Open a PR removing your folder. Merged within 7 days. Content stays in git history (any OSS project does), but it's no longer in the index. Forks aside, you're delisted from every surface within minutes of the next index rebuild.",
              },
              {
                q: "Why not just LinkedIn or Upwork?",
                a: "LinkedIn lists everyone, vetted nothing. Upwork brokers low-stakes work with a 10% cut. Neither is agent-native, neither pairs humans with their own published skills, neither is an open registry. opengoat is for operators whose moat is judgment + accumulated reputation in a specific niche — not commodity freelance work.",
              },
              {
                q: "How are submissions vetted?",
                a: "Manual review of every PR. We check verifiable past work, reference contacts, and read the playbook for genuine methodology vs. LinkedIn fluff. ~50% of submissions are rejected. The directory's value is the curation; we'd rather have 50 real operators than 5,000 freelancers.",
              },
              {
                q: "Can my agent really book a human autonomously?",
                a: "It can surface a booking URL. The booking itself happens on the operator's Cal.com (or equivalent). Agent + user decide whether to proceed. We don't process payments, we don't broker the transaction. The human stays in the loop where it counts.",
              },
              {
                q: "What if opengoat shuts down?",
                a: "Every profile and playbook is in a public Git repo with permissive licensing (MIT for code, CC-BY 4.0 for content). Anyone can fork it and run their own registry. Operators can keep their content. The standard schema means other registries can index it. There's no vendor to lock you in.",
              },
              {
                q: "How is this different from Orthogonal.sh?",
                a: "Orthogonal is the execution layer — they run skills via API gateways, no human attached. opengoat is the layer above: each skill has a human author, a goat.md explaining what they add beyond the skill, and a hire link. Skills are runnable (we can dispatch to Orthogonal or others), but the value is the human + skill pair. Different layer, complementary product.",
              },
            ].map(({ q, a }) => (
              <details key={q} className="rounded-lg border border-border bg-panel overflow-hidden">
                <summary className="px-5 py-4 text-ink font-medium cursor-pointer hover:text-accent transition">
                  {q}
                </summary>
                <div className="px-5 pb-5 text-dim text-sm leading-relaxed">{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-24 text-center">
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-ink">
            The agent era needs human operators.<br />
            <span className="text-dim">Be one of the goats.</span>
          </h2>
          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            <Link
              href="/contribute"
              className="px-5 py-3 rounded-md bg-accent text-bg font-medium hover:opacity-90 transition"
            >
              Be listed
            </Link>
            <Link
              href="/search"
              className="px-5 py-3 rounded-md border border-border hover:border-accent hover:text-accent transition"
            >
              Find a human
            </Link>
            <a
              href="https://github.com/OpenGoatHQ/opengoat"
              className="px-5 py-3 rounded-md border border-border hover:border-accent hover:text-accent transition"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
