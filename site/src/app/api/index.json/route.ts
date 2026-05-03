import { loadIndex } from "@/lib/data";

export const dynamic = "force-static";

export function GET() {
  const idx = loadIndex();
  return new Response(JSON.stringify(idx, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=600, s-maxage=600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
