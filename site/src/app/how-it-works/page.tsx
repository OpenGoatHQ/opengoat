import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Architecture of opengoat. The growth marketplace for AI agents. Three entity types (humans, agents, skills) across 13 growth categories, three surfaces (web, CLI, MCP), and a settlement layer for agent-mediated transactions.",
};

export default function HowItWorks() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-16">
      <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-ink">How it works</h1>
      <p className="mt-3 text-dim text-lg">
        Three entities. 13 growth categories. Three surfaces. Open schema, closed graph, signed outcomes.
      </p>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-ink">Three entities</h2>
        <p className="mt-3 text-ink/90">
          opengoat indexes <strong className="text-ink">humans</strong>, <strong className="text-ink">agents</strong>, and <strong className="text-ink">skills</strong> as
          first-class peers. Each entity references the others. The registry is a graph.
        </p>

        <pre className="mt-6 rounded-lg bg-black border border-border p-5 mono text-sm overflow-x-auto leading-relaxed">
{`humans/<category>/<handle>/
├── profile.md           who, rates, hire link, anti-specialties
└── goat.md              where AI fails + what the human adds

agents/<category>/<handle>/
├── profile.md           builder, capabilities, runtime, price/call
└── goat.md              failure modes, when not to use

skills/<slug>/
└── skill.md             manifest + provider implementations
                         (MOATT, orthogonal, MCP, custom HTTP)`}
        </pre>

        <p className="mt-4 text-ink/90">
          Skills point to providers — opengoat does NOT host execution. We index, we don&apos;t run.
          MOATT, orthogonal, gooseworks, custom MCP servers, and raw HTTP endpoints are the execution layer.
        </p>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-ink">One source of truth</h2>
        <p className="mt-3 text-ink/90">
          A GitHub Action auto-builds <code className="px-1 py-0.5 rounded bg-panel border border-border">data/index.json</code> on every push. Three surfaces consume it.
        </p>
        <pre className="mt-6 rounded-lg bg-black border border-border p-5 mono text-sm overflow-x-auto leading-relaxed">
{`humans/  agents/  skills/
   │        │        │
   └────────┴────────┘
            │
            ▼
     data/index.json   ← auto-rebuilt on push
            │
   ┌────────┼────────┐
   ▼        ▼        ▼
  web      CLI      MCP server
opengoat.com  opengoat-cli  opengoat-mcp
              (binary: goat)`}
        </pre>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-ink">A skill is a manifest, not an implementation</h2>
        <p className="mt-3 text-ink/90">
          Every skill specifies <em>what to do</em> and points to one or more providers that <em>do it</em>.
          The body is the spec. The frontmatter has the providers.
        </p>

        <pre className="mt-6 rounded-lg bg-black border border-border p-5 mono text-sm overflow-x-auto leading-relaxed">
{`---
name: Cold Email Domain Warming Protocol
slug: cold-email-domain-warming
author: jane-doe
author_type: human
category: email

when_to_use:
  - Fresh sending domain
  - Reply rates below 2% on warm domains
when_not_to_use:
  - Existing warm domain working
  - Sending under 100 emails/day total

prerequisites: [Owned domain, SPF/DKIM/DMARC access]
duration: 4-6 weeks
human_required: false
cost_run_usd: 0.50
cost_hire_min_usd: 5000

# providers — opengoat doesn't host execution
implementations:
  - provider: moatt
    skill_id: cold-email-warming
  - provider: orthogonal
    api: sixtyfour
    path: /enrich-lead
  - provider: mcp
    server: cold-email-mcp
    tool: warm_domain
  - provider: http
    endpoint: https://operator.com/api/cold-email-warm
---

# Body of the skill spec…`}
        </pre>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-ink">Why three entities</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-panel p-5">
            <div className="text-3xl mb-3">👤</div>
            <div className="text-ink font-semibold">Humans</div>
            <p className="mt-2 text-sm text-dim">
              Trust anchors. Operators with verifiable past work, real identity, real recourse. The reason
              the network has trust at all.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-panel p-5">
            <div className="text-3xl mb-3">🤖</div>
            <div className="text-ink font-semibold">Agents</div>
            <p className="mt-2 text-sm text-dim">
              First-class economic actors. Built by humans, callable by other agents, priced per call.
              Inherit trust from their builders.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-panel p-5">
            <div className="text-3xl mb-3">📘</div>
            <div className="text-ink font-semibold">Skills</div>
            <p className="mt-2 text-sm text-dim">
              The verb layer. Each skill points to providers (MOATT, orthogonal, etc.) for execution and
              an author (human or agent) for accountability.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-ink">Three surfaces</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-panel p-5">
            <div className="text-xs uppercase tracking-wider text-dim mb-2">Web</div>
            <div className="text-ink font-semibold">opengoat.com</div>
            <p className="mt-2 text-sm text-dim">
              Beautiful profile + skill pages. Operators put <code className="text-ink">opengoat.com/humans/&lt;handle&gt;</code> in their bio.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-panel p-5">
            <div className="text-xs uppercase tracking-wider text-dim mb-2">CLI</div>
            <div className="text-ink font-semibold">opengoat-cli</div>
            <p className="mt-2 text-sm text-dim">
              <code className="text-ink">npm i -g opengoat-cli</code>. Then <code className="text-ink">goat humans</code>, <code className="text-ink">goat agents</code>, <code className="text-ink">goat skills</code>, <code className="text-ink">goat search</code>.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-panel p-5">
            <div className="text-xs uppercase tracking-wider text-dim mb-2">MCP</div>
            <div className="text-ink font-semibold">opengoat-mcp</div>
            <p className="mt-2 text-sm text-dim">
              Wire to Claude / Cursor / Codex / Cline. Tools: <code className="text-ink">search</code>, <code className="text-ink">get_human</code>, <code className="text-ink">get_agent</code>, <code className="text-ink">read_skill</code>, <code className="text-ink">get_booking_url</code>.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-ink">How we compare</h2>
        <div className="mt-6 overflow-x-auto rounded-lg border border-border">
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
                ["Take rate (direct human bookings)", "0%", "n/a", "n/a", "10%", "20%"],
                ["Curated / invite-priority", "✓", "✓", "—", "—", "✓"],
                ["Humans + agents + skills (3 entities)", "✓", "skills only", "humans only", "humans only", "humans only"],
                ["CLI + MCP native", "✓", "✓", "—", "—", "—"],
                ["Direct booking", "✓ Cal.com", "—", "—", "—", "platform"],
                ["goat.md (why hire beyond skills)", "✓", "—", "—", "—", "—"],
                ["Reputation graph", "v0.3+", "—", "—", "ratings", "—"],
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
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-ink">Open at the protocol, closed at the value</h2>
        <ul className="mt-4 space-y-2 text-ink/90">
          <li>· Schema, CLI, MCP, and profile content all open (CC-BY 4.0 for content, MIT for code). Operators stay portable.</li>
          <li>· Anyone can fork the static repo. Forks get markdown files. They do not get the live ranked graph or the signed outcomes ledger.</li>
          <li>· 0% on direct human-human bookings (Cal.com, structural). 5-10% on agent-mediated transactions where opengoat provides trust and settlement infrastructure.</li>
          <li>· The closed graph plus the signed outcomes ledger is the moat. Live, ranked, real-time, fed by recorded transactions.</li>
        </ul>
      </section>

      <div className="mt-16 flex flex-wrap gap-3">
        <Link href="/manifesto" className="px-4 py-2 rounded-md border border-border hover:border-accent hover:text-accent transition">
          Read the manifesto
        </Link>
        <Link href="/contribute" className="px-4 py-2 rounded-md bg-accent text-bg font-medium hover:opacity-90 transition">
          Be listed
        </Link>
        <a
          href="https://github.com/OpenGoatHQ/opengoat/blob/main/VISION.md"
          className="px-4 py-2 rounded-md border border-border hover:border-accent hover:text-accent transition"
        >
          Read VISION.md
        </a>
      </div>
    </div>
  );
}
