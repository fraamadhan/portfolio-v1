import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { client, writeClient } from "@/lib/sanity.client";
import { TESTIMONIALS_PER_PAGE } from "@/features/testimonial/constants";
import { getTestimonialsPage } from "@/features/testimonial/queries";
import { validateTestimonialInput } from "@/features/testimonial/validation";

const getInvalidResponse = (message = "Invalid testimonial payload.") =>
  NextResponse.json(
    { message },
    { status: 400 }
  );

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? String(TESTIMONIALS_PER_PAGE));
  const userId = searchParams.get("userId") ?? "";

  const testimonialPage = await getTestimonialsPage({
    page: Number.isFinite(page) ? page : 1,
    limit: Number.isFinite(limit) ? limit : TESTIMONIALS_PER_PAGE,
    userId: userId || undefined,
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

  let body: {
    author?: string;
    role?: string;
    institution?: string;
    tag?: string;
    quote?: string;
    userId?: string;
    honeypot?: string;
  } | null = null;

  try {
    body = await request.json();
  } catch {
    return getInvalidResponse();
  }

  // Honeypot check
  if (body?.honeypot) {
    // Treat as bot, fail silently or reject
    return NextResponse.json(
      { message: "Spam detected." },
      { status: 400 }
    );
  }

  const payload = {
    author: body?.author ?? "",
    role: body?.role ?? "",
    institution: body?.institution ?? "",
    tag: body?.tag ?? "",
    quote: body?.quote ?? "",
  };

  const userId = body?.userId ?? "";

  if (
    !payload.author.trim() ||
    !payload.role.trim() ||
    !payload.institution.trim() ||
    !payload.tag.trim() ||
    !payload.quote.trim() ||
    !userId.trim()
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

  // Content validation (restricted links and bad words detection)
  const validationResult = validateTestimonialInput(payload);
  if (!validationResult.isValid) {
    return getInvalidResponse(validationResult.error);
  }

  try {
    const doc = {
      _type: "testimonial",
      approved: false,
      user: {
        _type: "reference",
        _ref: userId,
      },
      giverName: payload.author.trim(),
      giverRole: payload.role.trim(),
      giverInstitution: payload.institution.trim(),
      tags: [payload.tag.trim()],
      content: {
        _type: "localeString",
        id: payload.quote.trim(),
        en: payload.quote.trim(),
      },
    };

    await writeClient.create(doc);
  } catch (error: any) {
    console.error("Failed to insert testimonial into Sanity:", error.message);
    return NextResponse.json(
      { message: "Failed to save testimonial." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    message: "Testimonial submitted successfully.",
  });
}
