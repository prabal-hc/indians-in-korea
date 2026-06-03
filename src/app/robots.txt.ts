import { NextResponse } from "next/server";

export function GET() {
  return new NextResponse(
    `User-agent: *
Disallow: /admin
Allow: /
Sitemap: https://indiansinkorea.com/sitemap.xml`,
    {
      headers: {
        "Content-Type": "text/plain",
      },
    },
  );
}
