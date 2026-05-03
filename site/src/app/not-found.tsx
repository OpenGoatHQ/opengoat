import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-24 text-center">
      <h1 className="text-4xl font-semibold text-ink">Not found.</h1>
      <p className="mt-3 text-dim">We don&apos;t have that human or playbook in the registry.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className="px-4 py-2 rounded-md border border-border hover:border-accent transition">Home</Link>
        <Link href="/search" className="px-4 py-2 rounded-md bg-accent text-bg font-medium hover:opacity-90 transition">Search</Link>
      </div>
    </div>
  );
}
