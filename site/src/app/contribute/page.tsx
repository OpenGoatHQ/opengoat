import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Be listed",
  description:
    "How to publish your profile and playbooks on opengoat. Bar for inclusion. What we reject.",
};

export default function ContributePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight text-ink">Be listed</h1>
      <p className="mt-3 text-dim">
        opengoat is curated. Free to submit, free to be listed. ~50% of submissions are rejected — the
        directory&apos;s value is that bar.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-ink">What you publish</h2>
      <ul className="mt-3 space-y-2 text-ink/90">
        <li>· One profile (who you are, what you do, what you don&apos;t, how to hire)</li>
        <li>· At least one real playbook (your actual methodology, not LinkedIn fluff)</li>
      </ul>

      <h2 className="mt-10 text-xl font-semibold text-ink">The bar</h2>
      <ul className="mt-3 space-y-2 text-ink/90">
        <li>· Verifiable past work (linked artifacts or named clients — anonymized OK if NDA)</li>
        <li>· Honest rates and anti-specialties on the profile</li>
        <li>· Playbook with concrete steps, prerequisites, outputs</li>
        <li>· Required frontmatter: <code className="px-1 py-0.5 rounded bg-panel border border-border text-sm">when_to_use</code>, <code className="px-1 py-0.5 rounded bg-panel border border-border text-sm">when_not_to_use</code>, <code className="px-1 py-0.5 rounded bg-panel border border-border text-sm">human_required</code>, <code className="px-1 py-0.5 rounded bg-panel border border-border text-sm">cost_hire_min_usd</code>, <code className="px-1 py-0.5 rounded bg-panel border border-border text-sm">duration</code></li>
        <li>· No AI-generated content</li>
      </ul>

      <h2 className="mt-10 text-xl font-semibold text-ink">How to submit</h2>
      <pre className="mt-3 rounded-lg bg-black border border-border p-4 mono text-sm overflow-x-auto">
{`# 1. Fork the repo on GitHub
git clone https://github.com/<you>/opengoat
cd opengoat

# 2. Copy the template into the right category folder
cp -r humans/_template humans/<category>/<your-handle>

# 3. Fill profile.md and at least one playbook.md
# 4. Validate locally
npx opengoat-cli verify .

# 5. Open a PR. Reviewed within 7 days.`}
      </pre>

      <h2 className="mt-10 text-xl font-semibold text-ink">Common rejection reasons</h2>
      <ul className="mt-3 space-y-2 text-ink/90">
        <li>· Generic advice (&quot;write good copy&quot;, &quot;be authentic&quot;)</li>
        <li>· No anti-specialties listed</li>
        <li>· No verifiable past work</li>
        <li>· Missing or fake <code className="px-1 py-0.5 rounded bg-panel border border-border text-sm">when_not_to_use</code> (every real playbook has anti-conditions)</li>
        <li>· LinkedIn-style fluff</li>
        <li>· AI-generated content (we sniff this)</li>
      </ul>

      <p className="mt-10 text-dim text-sm">
        Full guidelines:{" "}
        <a
          href="https://github.com/OpenGoatHQ/opengoat/blob/main/CONTRIBUTING.md"
          className="text-accent hover:underline"
        >
          CONTRIBUTING.md
        </a>
      </p>
    </div>
  );
}
