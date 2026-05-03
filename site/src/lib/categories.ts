export type Category = {
  slug: string;
  name: string;
  blurb: string;
};

export const CATEGORIES: Category[] = [
  { slug: "seo", name: "SEO", blurb: "Search and AI-search visibility (incl. GEO)" },
  { slug: "content", name: "Content", blurb: "Blog, founder media, ghostwriting, newsletter" },
  { slug: "video", name: "Video", blurb: "YouTube, TikTok, Reels, Shorts" },
  { slug: "email", name: "Email", blurb: "Lifecycle, cold email, deliverability" },
  { slug: "paid", name: "Paid", blurb: "Search, social, sponsorships, influencer" },
  { slug: "community", name: "Community", blurb: "Discord, Slack, niche forums" },
  { slug: "reddit", name: "Reddit", blurb: "Reddit and distributed marketing at scale" },
  { slug: "plg", name: "PLG", blurb: "Product-led growth, onboarding, viral loops" },
  { slug: "outbound", name: "Outbound", blurb: "Sales-led, modern outbound, founder-led sales" },
  { slug: "launches", name: "Launches", blurb: "Product Hunt, Hacker News, BetaList" },
  { slug: "pr", name: "PR", blurb: "Press, podcasts, creator partnerships" },
  { slug: "platform", name: "Platform", blurb: "App stores, marketplaces, integrations" },
  { slug: "gtm-engineering", name: "GTM Engineering", blurb: "Clay, reverse ETL, automation, attribution" },
];

export function categoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
