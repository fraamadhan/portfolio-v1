import { unstable_noStore as noStore } from "next/cache";

import { client } from "@/lib/sanity.client";
import { TESTIMONIALS_PER_PAGE } from "./constants";
import { TestimonialPageData } from "./types";

export const getTestimonialsPage = async ({
  page = 1,
  limit = TESTIMONIALS_PER_PAGE,
  userId,
}: {
  page?: number;
  limit?: number;
  userId?: string;
} = {}): Promise<TestimonialPageData> => {
  noStore();

  const safePage = Math.max(1, page);
  const safeLimit = Math.max(1, limit);
  const from = (safePage - 1) * safeLimit;
  const to = from + safeLimit;

  if (!userId) {
    return {
      testimonials: [],
      page: safePage,
      totalCount: 0,
      totalPages: 1,
    };
  }

  try {
    const result = await client.fetch<{
      testimonials: Array<{
        _id: string;
        giverName: string;
        giverRole: string;
        giverInstitution?: string;
        tags?: string[];
        content?: {
          id?: string;
          en?: string;
        };
      }>;
      totalCount: number;
    }>(
      `{
        "testimonials": *[_type == "testimonial" && approved == true && user._ref == $userId && !(_id in path('drafts.**'))] | order(_createdAt desc) [$from...$to] {
          _id,
          giverName,
          giverRole,
          giverInstitution,
          tags,
          content
        },
        "totalCount": count(*[_type == "testimonial" && approved == true && user._ref == $userId && !(_id in path('drafts.**'))])
      }`,
      { userId, from, to }
    );

    const totalCount = result?.totalCount ?? 0;
    const totalPages = Math.max(1, Math.ceil(totalCount / safeLimit));

    const mappedTestimonials = (result?.testimonials ?? []).map((t) => ({
      id: t._id,
      author: t.giverName || "",
      role: t.giverRole || "",
      institution: t.giverInstitution || "",
      quote: t.content?.id || t.content?.en || "",
      tag: t.tags?.[0] || "",
    }));

    return {
      testimonials: mappedTestimonials,
      page: safePage,
      totalCount,
      totalPages,
    };
  } catch (error) {
    console.error("Failed to load testimonials from Sanity:", error);
    return {
      testimonials: [],
      page: safePage,
      totalCount: 0,
      totalPages: 1,
    };
  }
};
