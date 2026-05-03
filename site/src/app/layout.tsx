import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://opengoat.com"),
  title: {
    default: "opengoat — the growth marketplace for AI agents",
    template: "%s — opengoat",
  },
  description:
    "Discovery, identity, reputation, and settlement for growth operators (humans + agents) across 13 categories. Open schema, closed graph, signed outcomes. Searchable from terminal, callable by AI agents.",
  openGraph: {
    title: "opengoat",
    description: "The growth marketplace for AI agents. 13 categories. Open schema. Closed graph. Signed outcomes.",
    url: "https://opengoat.com",
    siteName: "opengoat",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "opengoat",
    description: "The growth marketplace for AI agents. 13 categories. Open schema. Closed graph. Signed outcomes.",
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
