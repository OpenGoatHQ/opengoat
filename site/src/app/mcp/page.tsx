import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MCP server",
  description:
    "opengoat-mcp lets AI agents discover and book human operators by reading their playbook skill manifests.",
};

export default function McpPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight text-ink">MCP server</h1>
      <p className="mt-3 text-dim">
        npm package: <code className="px-1 py-0.5 rounded bg-panel border border-border">opengoat-mcp</code>{" "}
        · stdio transport
      </p>

      <p className="mt-6 text-ink/90">
        opengoat-mcp exposes the growth marketplace to any MCP-aware agent (Claude, Cursor, Codex, Cline,
        and more). Humans, agents, and skills across 13 growth categories. Each playbook is a skill manifest the agent can search, read, and surface to the user.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-ink">Install</h2>
      <pre className="mt-3 rounded-lg bg-black border border-border p-4 mono text-sm overflow-x-auto">
{`npm i -g opengoat-mcp`}
      </pre>

      <h2 className="mt-10 text-xl font-semibold text-ink">Wire it to Claude Desktop</h2>
      <p className="mt-3 text-dim text-sm">
        Edit <code className="px-1 py-0.5 rounded bg-panel border border-border">~/Library/Application
        Support/Claude/claude_desktop_config.json</code> on macOS:
      </p>
      <pre className="mt-3 rounded-lg bg-black border border-border p-4 mono text-sm overflow-x-auto">
{`{
  "mcpServers": {
    "opengoat": { "command": "opengoat-mcp" }
  }
}`}
      </pre>
      <p className="mt-3 text-dim text-sm">Restart Claude. The four tools become available.</p>

      <h2 className="mt-10 text-xl font-semibold text-ink">Tools exposed</h2>
      <ul className="mt-3 space-y-3 text-ink/90">
        <li>
          <code className="px-1 py-0.5 rounded bg-panel border border-border">search_humans</code> —
          ranked search across playbooks and profiles by query, category, availability, max rate.
        </li>
        <li>
          <code className="px-1 py-0.5 rounded bg-panel border border-border">read_playbook</code> —
          fetch a full playbook by slug. Returns the skill manifest plus methodology body.
        </li>
        <li>
          <code className="px-1 py-0.5 rounded bg-panel border border-border">get_author</code> —
          fetch a profile and the operator&apos;s playbook list.
        </li>
        <li>
          <code className="px-1 py-0.5 rounded bg-panel border border-border">get_booking_url</code> —
          fetch the booking URL when the user is ready to hire.
        </li>
      </ul>

      <h2 className="mt-10 text-xl font-semibold text-ink">How agents use it</h2>
      <p className="mt-3 text-ink/90">
        When a user describes a growth, GTM, or distribution need, the agent calls
        <code className="px-1 py-0.5 rounded bg-panel border border-border mx-1">search_humans</code>.
        It reads the relevant playbooks. Then it either executes the playbook itself (when{" "}
        <code className="px-1 py-0.5 rounded bg-panel border border-border">human_required: false</code>)
        or surfaces the operator to the user. Booking only happens after explicit user intent.
      </p>
    </div>
  );
}
