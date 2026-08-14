import { MetadataRoute } from "next";
import { client } from "@/lib/sanity.client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let users: { slug: string }[] = [];
  try {
    users = await client.fetch(`
      *[_type == "user" && !(_id in path('drafts.**'))]{
        "slug": slug.current
      }
    `);
  } catch (err) {
    console.error("Failed to fetch sitemap slugs:", err);
  }

  // Fallback to absolute site URL (Next.js configures the true request origin automatically where possible)
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const userEntries = users.map((user) => ({
    url: `${baseUrl}/${user.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 1.0,
  }));

  const staticEntries = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];

  return [...staticEntries, ...userEntries];
}
