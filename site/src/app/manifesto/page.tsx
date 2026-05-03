import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manifesto",
  description:
    "AI agents have skill registries. Humans need one too. opengoat is the human-skill registry for the agent era.",
};

export default function Manifesto() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
      <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-ink">Manifesto</h1>
      <div className="mt-8 space-y-6 text-lg text-ink/90 leading-relaxed">
        <p>
          AI agents have skill registries. MCP. Anthropic skills. Native tool use. They can find, read, and
          execute their own capabilities.
        </p>
        <p>
          Humans need the same. Not a LinkedIn-flavored profile bloated with adjectives. A real{" "}
          <span className="text-ink font-semibold">skill manifest</span>: when to use it, when not to, the
          prerequisites, the outputs, the duration, the cost of hiring.
        </p>
        <p>
          A <span className="text-ink font-semibold">playbook</span> is the human equivalent of a skill
          manifest. Operators publish their methodology — the actual one, not a sanitized version. Each
          playbook is the portfolio. If you can&apos;t publish one, you don&apos;t belong here.
        </p>
        <p>
          opengoat is the open registry of those manifests. Agents query it. They decide whether to execute
          themselves or surface a human. Users hire directly. We take 0%.
        </p>
        <p>
          AI handles what AI can. Humans handle what humans must — judgement, accountability, relationships,
          embodied expertise. The registry is the bridge.
        </p>
        <p className="text-dim italic">
          Open source. CC-BY content. MIT code. No paywalls. No fake experts. No take rate.
        </p>
      </div>
    </div>
  );
}
