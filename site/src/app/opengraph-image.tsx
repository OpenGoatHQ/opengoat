import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "opengoat — the human-skill registry for the agent era";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 70px",
          color: "#fafafa",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            color: "#10b981",
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          opengoat
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 24,
              color: "#888888",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            curated · invite-priority · no take rate
          </div>
          <div
            style={{
              fontSize: 84,
              lineHeight: 1.05,
              fontWeight: 700,
              letterSpacing: "-0.03em",
            }}
          >
            The moat in the agent era<br />isn&apos;t agents.
          </div>
          <div style={{ fontSize: 32, color: "#888888", maxWidth: 1000 }}>
            It&apos;s the humans who operate them.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#888888",
            fontSize: 22,
          }}
        >
          <div>opengoat.com</div>
          <div>· github.com/OpenGoatHQ</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
