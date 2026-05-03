import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://opengoat.com"),
  title: {
    default: "opengoat — the human-skill registry for the agent era",
    template: "%s — opengoat",
  },
  description:
    "Open directory of growth, GTM, and distribution operators. Each human publishes their real playbooks as skill manifests. Searchable from your terminal. Callable by AI agents. No take rate.",
  openGraph: {
    title: "opengoat",
    description: "The human-skill registry for the agent era.",
    url: "https://opengoat.com",
    siteName: "opengoat",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "opengoat",
    description: "The human-skill registry for the agent era.",
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-bg text-ink antialiased min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
