import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 flex flex-col sm:flex-row gap-6 justify-between text-sm text-dim">
        <div>
          <div className="text-ink font-semibold">opengoat</div>
          <div>The growth marketplace for AI agents.</div>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/manifesto" className="hover:text-ink transition">Manifesto</Link>
          <Link href="/how-it-works" className="hover:text-ink transition">How it works</Link>
          <Link href="/contribute" className="hover:text-ink transition">Contribute</Link>
          <a href="https://github.com/OpenGoatHQ/opengoat" className="hover:text-ink transition">GitHub</a>
          <a href="https://www.npmjs.com/package/opengoat-cli" className="hover:text-ink transition">npm: opengoat-cli</a>
          <a href="https://www.npmjs.com/package/opengoat-mcp" className="hover:text-ink transition">npm: opengoat-mcp</a>
        </div>
      </div>
    </footer>
  );
}
