import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Architecture and economics of opengoat — the open registry where operators publish playbooks as skill manifests, and three surfaces consume them: web, CLI, and MCP.",
};

export default function HowItWorks() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-16">
      <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-ink">How it works</h1>
      <p className="mt-3 text-dim text-lg">
        One source of truth. Three surfaces. Zero lock-in.
      </p>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-ink">The architecture</h2>
        <p className="mt-3 text-ink/90">
          The repo is the database. Each operator has a folder. Each profile and playbook is a markdown file
          with structured frontmatter. A GitHub Action auto-builds <code className="px-1 py-0.5 rounded bg-panel border border-border">data/index.json</code> on every push. Three surfaces read from it.
        </p>

        <pre className="mt-6 rounded-lg bg-black border border-border p-5 mono text-sm overflow-x-auto leading-relaxed">
{`humans/<category>/<handle>/
├── profile.md
└── playbooks/
    ├── <slug>.md
    └── ...

         │
         ▼
   data/index.json   ← auto-rebuilt on push
         │
   ┌─────┼─────────────────────┐
   ▼     ▼                     ▼
 site   CLI                  MCP server
opengoat.com  open-goat   opengoat-mcp
   │     │                     │
   ▼     ▼                     ▼
humans  devs                AI agents`}
        </pre>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-ink">A playbook is a skill manifest</h2>
        <p className="mt-3 text-ink/90">
          Each playbook has machine-readable metadata that agents parse to decide whether to execute it
          themselves or surface the operator who wrote it.
        </p>

        <pre className="mt-6 rounded-lg bg-black border border-border p-5 mono text-sm overflow-x-auto leading-relaxed">
{`---
name: Cold Email Domain Warming Protocol
slug: cold-email-domain-warming
author: <handle>
category: email
tags: [cold-email, deliverability, infrastructure]
description: >
  Bring a fresh sending domain to 5%+ reply rates in 4-6 weeks.

when_to_use:
  - Fresh sending domain
  - Reply rates below 2% on warm domains
when_not_to_use:
  - Existing warm domain working fine
  - Sending under 100 emails/day total

prerequisites: [Owned domain, SPF/DKIM/DMARC access]
outputs: [Production-ready domain, Volume ramp doc, Reply rate baseline]
duration: 4-6 weeks
difficulty: intermediate
human_required: false
cost_diy_usd: 0
cost_hire_min_usd: 5000
cost_hire_max_usd: 15000
---

# Body of the playbook…`}
        </pre>

        <p className="mt-6 text-ink/90">
          When <code className="px-1 py-0.5 rounded bg-panel border border-border">human_required: false</code>, a competent agent can follow the playbook itself.
          When <code className="px-1 py-0.5 rounded bg-panel border border-border">true</code>, the agent surfaces the operator for hiring instead. The operator gets paid, the user gets a real human with accumulated reputation, and opengoat takes 0%.
        </p>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-ink">Three surfaces</h2>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-panel p-5">
            <div className="text-xs uppercase tracking-wider text-dim mb-2">Web</div>
            <div className="text-ink font-semibold">opengoat.com</div>
            <p className="mt-2 text-sm text-dim">
              Beautiful profile pages. Operators share their <code className="text-ink">opengoat.com/&lt;handle&gt;</code> in
              bio. Buyers browse, click, book.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-panel p-5">
            <div className="text-xs uppercase tracking-wider text-dim mb-2">CLI</div>
            <div className="text-ink font-semibold">open-goat</div>
            <p className="mt-2 text-sm text-dim">
              <code className="text-ink">npm i -g open-goat</code>. Then <code className="text-ink">opengoat search</code>, <code className="text-ink">read</code>, <code className="text-ink">hire</code> from your terminal. JSON output for agents.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-panel p-5">
            <div className="text-xs uppercase tracking-wider text-dim mb-2">MCP</div>
            <div className="text-ink font-semibold">opengoat-mcp</div>
            <p className="mt-2 text-sm text-dim">
              MCP server. Wire it to Claude / Cursor / Codex / Cline. Four tools: <code className="text-ink">search_humans</code>, <code className="text-ink">read_playbook</code>, <code className="text-ink">get_author</code>, <code className="text-ink">get_booking_url</code>.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-ink">How it compares</h2>
        <div className="mt-6 overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-panel">
              <tr className="text-left text-dim">
                <th className="p-3 font-medium">&nbsp;</th>
                <th className="p-3 font-medium text-ink">opengoat</th>
                <th className="p-3 font-medium">LinkedIn</th>
                <th className="p-3 font-medium">Upwork</th>
                <th className="p-3 font-medium">Intro.co</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["Open-source registry", "✓", "—", "—", "—"],
                ["Take rate", "0%", "n/a", "10%", "20%"],
                ["Curated / invite-priority", "✓", "—", "—", "✓"],
                ["CLI access", "✓", "—", "—", "—"],
                ["Agent-native (MCP)", "✓", "—", "—", "—"],
                ["Operators publish playbooks", "✓", "—", "—", "—"],
                ["Direct booking (Cal.com)", "✓", "—", "—", "—"],
                ["Vetting bar", "~50% rejected", "—", "—", "invite-only"],
              ].map(([label, og, li, up, intro]) => (
                <tr key={label} className="text-ink/90">
                  <td className="p-3 text-dim">{label}</td>
                  <td className="p-3 text-accent font-medium">{og}</td>
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
        <h2 className="text-2xl font-semibold text-ink">No lock-in, no take rate, no platform tax</h2>
        <ul className="mt-4 space-y-2 text-ink/90">
          <li>· Content is CC-BY 4.0. Operators keep credit. The work is portable.</li>
          <li>· Code is MIT. Anyone can fork, run their own registry, or build on top.</li>
          <li>· Bookings happen on the operator&apos;s own Cal.com (or equivalent). opengoat never sees the transaction.</li>
          <li>· The data layer is the moat — graph of curated humans, not a SaaS dashboard.</li>
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
          href="https://github.com/OpenGoatHQ/opengoat"
          className="px-4 py-2 rounded-md border border-border hover:border-accent hover:text-accent transition"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}
