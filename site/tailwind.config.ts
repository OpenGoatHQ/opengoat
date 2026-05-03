import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Inter", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      colors: {
        bg: "#0a0a0a",
        panel: "#111111",
        border: "#222222",
        ink: "#fafafa",
        dim: "#888888",
        accent: "#10b981",
      },
      typography: ({ theme }: { theme: (key: string) => string }) => ({
        invert: {
          css: {
            "--tw-prose-body": theme("colors.ink"),
            "--tw-prose-headings": theme("colors.ink"),
            "--tw-prose-lead": theme("colors.ink"),
            "--tw-prose-links": theme("colors.accent"),
            "--tw-prose-bold": theme("colors.ink"),
            "--tw-prose-counters": theme("colors.dim"),
            "--tw-prose-bullets": theme("colors.dim"),
            "--tw-prose-hr": theme("colors.border"),
            "--tw-prose-quotes": theme("colors.ink"),
            "--tw-prose-quote-borders": theme("colors.border"),
            "--tw-prose-captions": theme("colors.dim"),
            "--tw-prose-code": theme("colors.ink"),
            "--tw-prose-pre-code": theme("colors.ink"),
            "--tw-prose-pre-bg": "#000000",
            "--tw-prose-th-borders": theme("colors.border"),
            "--tw-prose-td-borders": theme("colors.border"),
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
