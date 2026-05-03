import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CLI",
  description: "opengoat CLI — search, read, hire from your terminal. Binary: `goat`.",
};

export default function CliPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight text-ink">CLI</h1>
      <p className="mt-3 text-dim">
        npm package: <code className="px-1 py-0.5 rounded bg-panel border border-border">opengoat-cli</code>{" "}
        · binary: <code className="px-1 py-0.5 rounded bg-panel border border-border">goat</code>
      </p>

      <h2 className="mt-10 text-xl font-semibold text-ink">Install</h2>
      <pre className="mt-3 rounded-lg bg-black border border-border p-4 mono text-sm overflow-x-auto">
{`npm i -g opengoat-cli      # install once
# or
npx opengoat-cli <command>  # one-shot via npx`}
      </pre>

      <h2 className="mt-10 text-xl font-semibold text-ink">Quickstart</h2>
      <pre className="mt-3 rounded-lg bg-black border border-border p-4 mono text-sm overflow-x-auto">
{`goat reddit                                # list reddit operators
goat seo                                   # list seo operators
goat list --available --max-rate 500
goat search "cold email deliverability"
goat read <playbook-slug>
goat author <handle>
goat hire <handle>                         # opens booking link
goat submit                                # contribution wizard
goat verify .                              # validate locally`}
      </pre>

      <h2 className="mt-10 text-xl font-semibold text-ink">Shorthand</h2>
      <p className="mt-3 text-ink/90">
        <code className="px-1 py-0.5 rounded bg-panel border border-border">goat &lt;category&gt;</code> is sugar for{" "}
        <code className="px-1 py-0.5 rounded bg-panel border border-border">goat list --tag &lt;category&gt;</code>.
      </p>
      <p className="mt-2 text-dim text-sm">
        Works for all 13 categories: <code className="text-ink">seo</code>,{" "}
        <code className="text-ink">content</code>, <code className="text-ink">video</code>,{" "}
        <code className="text-ink">email</code>, <code className="text-ink">paid</code>,{" "}
        <code className="text-ink">community</code>, <code className="text-ink">reddit</code>,{" "}
        <code className="text-ink">plg</code>, <code className="text-ink">outbound</code>,{" "}
        <code className="text-ink">launches</code>, <code className="text-ink">pr</code>,{" "}
        <code className="text-ink">platform</code>, <code className="text-ink">gtm-engineering</code>.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-ink">For agents</h2>
      <p className="mt-3 text-dim">Every command supports <code className="px-1 py-0.5 rounded bg-panel border border-border">--json</code> for machine-readable output.</p>
      <pre className="mt-3 rounded-lg bg-black border border-border p-4 mono text-sm overflow-x-auto">
{`goat search "fleet account warming" --json
goat read fleet-warming --json
goat hire <handle> --print`}
      </pre>

      <p className="mt-10 text-dim text-sm">
        For native MCP integration with Claude / Cursor / Codex, see <a href="/mcp" className="text-accent hover:underline">/mcp</a>.
      </p>
    </div>
  );
}
