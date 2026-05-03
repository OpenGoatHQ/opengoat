import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CLI",
  description: "opengoat CLI — search, read, hire from your terminal.",
};

export default function CliPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight text-ink">CLI</h1>
      <p className="mt-3 text-dim">
        npm package: <code className="px-1 py-0.5 rounded bg-panel border border-border">open-goat</code>{" "}
        · binary: <code className="px-1 py-0.5 rounded bg-panel border border-border">opengoat</code>
      </p>

      <h2 className="mt-10 text-xl font-semibold text-ink">Install</h2>
      <pre className="mt-3 rounded-lg bg-black border border-border p-4 mono text-sm overflow-x-auto">
{`npm i -g open-goat        # install once
# or
npx open-goat <command>   # one-shot via npx`}
      </pre>

      <h2 className="mt-10 text-xl font-semibold text-ink">Commands</h2>
      <pre className="mt-3 rounded-lg bg-black border border-border p-4 mono text-sm overflow-x-auto">
{`opengoat list                              # all humans
opengoat list --tag reddit --available     # filter
opengoat list --max-rate 500
opengoat search "cold email deliverability"
opengoat read <playbook-slug>
opengoat author <handle>
opengoat hire <handle>                     # opens booking link
opengoat submit                            # contribution wizard
opengoat verify .                          # validate locally`}
      </pre>

      <h2 className="mt-10 text-xl font-semibold text-ink">For agents</h2>
      <p className="mt-3 text-dim">Every command supports <code className="px-1 py-0.5 rounded bg-panel border border-border">--json</code> for machine-readable output.</p>
      <pre className="mt-3 rounded-lg bg-black border border-border p-4 mono text-sm overflow-x-auto">
{`opengoat search "fleet account warming" --json
opengoat read fleet-warming --json
opengoat hire <handle> --print`}
      </pre>

      <p className="mt-10 text-dim text-sm">
        For native MCP integration with Claude / Cursor / Codex, see <a href="/mcp" className="text-accent hover:underline">/mcp</a>.
      </p>
    </div>
  );
}
