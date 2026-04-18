import { unstable_noStore as noStore } from "next/cache";

import { createSupabaseServerClient } from "@/lib/supabase/server";

import {
  mapTestimonialRow,
  TESTIMONIAL_SELECT_FIELDS,
  TestimonialRow,
} from "./lib";
import { TESTIMONIALS_PER_PAGE } from "./constants";
import { TestimonialPageData } from "./types";

export const getTestimonialsPage = async ({
  page = 1,
  limit = TESTIMONIALS_PER_PAGE,
}: {
  page?: number;
  limit?: number;
} = {}): Promise<TestimonialPageData> => {
  noStore();

  const safePage = Math.max(1, page);
  const safeLimit = Math.max(1, limit);
  const from = (safePage - 1) * safeLimit;
  const to = from + safeLimit - 1;

  const supabase = createSupabaseServerClient();
  const { data, error, count } = await supabase
    .from("testimonials")
    .select(TESTIMONIAL_SELECT_FIELDS, { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("Failed to load testimonials from Supabase:", error.message);
    return {
      testimonials: [],
      page: safePage,
      totalCount: 0,
      totalPages: 1,
    };
  }

  const totalCount = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / safeLimit));

  return {
    testimonials: ((data ?? []) as TestimonialRow[]).map(mapTestimonialRow),
    page: safePage,
    totalCount,
    totalPages,
  };
};
