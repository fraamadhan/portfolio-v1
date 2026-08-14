import { Resend } from "resend";
import { EMAIL_ADDRESS } from "@/features/about-me/function";
import { rateLimit } from "@/lib/rate-limit";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // Rate limit: Max 3 requests per 1 minute per IP
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const limitResult = rateLimit(ip, 3, 60 * 1000);
    if (!limitResult.success) {
      return Response.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const { from, subject, body } = await request.json();

    if (!from || !subject || !body) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(from.trim())) {
      return Response.json(
        { error: "Invalid email address format" },
        { status: 400 }
      );
    }

    // Length limits validation to prevent payload size abuse
    if (subject.trim().length > 150 || body.trim().length > 2000) {
      return Response.json(
        { error: "Subject or body exceeds length limits" },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: [EMAIL_ADDRESS],
      subject: `[Portfolio Contact] ${subject}`,
      replyTo: from,
      text: `From: ${from}\n\n${body}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ success: true, data });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
