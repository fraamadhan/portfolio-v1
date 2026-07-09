import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

import {
  createSupabaseAdminClient,
  createSupabaseServerClient,
} from "@/lib/supabase/server";

import {
  createTestimonialInsertPayload,
  mapTestimonialRow,
  TESTIMONIAL_SELECT_FIELDS,
  TestimonialRow,
} from "@/features/testimonial/lib";
import { TestimonialFormState } from "@/features/testimonial/types";
import { TESTIMONIALS_PER_PAGE } from "@/features/testimonial/constants";
import { getTestimonialsPage } from "@/features/testimonial/queries";

const getInvalidResponse = (message = "Invalid testimonial payload.") =>
  NextResponse.json(
    { message },
    { status: 400 }
  );

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? String(TESTIMONIALS_PER_PAGE));

  const testimonialPage = await getTestimonialsPage({
    page: Number.isFinite(page) ? page : 1,
    limit: Number.isFinite(limit) ? limit : TESTIMONIALS_PER_PAGE,
  });

  return NextResponse.json(testimonialPage);
}

export async function POST(request: Request) {
  // Rate limit: Max 2 testimonials per 5 minutes per IP
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1";

  const limitResult = rateLimit(ip, 2, 5 * 60 * 1000);
  if (!limitResult.success) {
    return NextResponse.json(
      { message: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  let body: Partial<TestimonialFormState> | null = null;

  try {
    body = (await request.json()) as Partial<TestimonialFormState>;
  } catch {
    return getInvalidResponse();
  }

  const payload: TestimonialFormState = {
    author: body?.author ?? "",
    role: body?.role ?? "",
    institution: body?.institution ?? "",
    tag: body?.tag ?? "",
    quote: body?.quote ?? "",
  };

  if (
    !payload.author.trim() ||
    !payload.role.trim() ||
    !payload.institution.trim() ||
    !payload.tag.trim() ||
    !payload.quote.trim()
  ) {
    return getInvalidResponse("All fields are required.");
  }

  // Length limits validation
  if (
    payload.author.trim().length > 100 ||
    payload.role.trim().length > 100 ||
    payload.institution.trim().length > 100 ||
    payload.tag.trim().length > 50 ||
    payload.quote.trim().length > 1000
  ) {
    return getInvalidResponse("Input values exceed length limits.");
  }

  const supabase =
    createSupabaseAdminClient() ?? createSupabaseServerClient();
  const { data, error } = await supabase
    .from("testimonials")
    .insert(createTestimonialInsertPayload(payload))
    .select(TESTIMONIAL_SELECT_FIELDS)
    .single();

  if (error) {
    console.error("Failed to insert testimonial into Supabase:", error.message);

    if (error.message.toLowerCase().includes("row-level security policy")) {
      return NextResponse.json(
        {
          message:
            "Supabase blocked this insert because the testimonials table RLS policy does not allow it. Add an INSERT policy for anon users, or set SUPABASE_SERVICE_ROLE_KEY for the server route.",
        },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { message: "Failed to save testimonial." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    testimonial: mapTestimonialRow(data as TestimonialRow),
  });
}
