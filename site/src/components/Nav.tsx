import Link from "next/link";

export function Nav() {
  return (
    <nav className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight text-ink hover:text-accent transition">
          opengoat
        </Link>
        <div className="flex items-center gap-6 text-sm text-dim">
          <Link href="/manifesto" className="hover:text-ink transition">manifesto</Link>
          <Link href="/how-it-works" className="hover:text-ink transition">how it works</Link>
          <Link href="/cli" className="hover:text-ink transition">cli</Link>
          <Link href="/mcp" className="hover:text-ink transition">mcp</Link>
          <Link href="/search" className="hover:text-ink transition">search</Link>
          <Link
            href="/contribute"
            className="px-3 py-1.5 rounded-md border border-border hover:border-accent hover:text-accent transition"
          >
            be listed
          </Link>
        </div>
      </div>
    </nav>
  );
}
