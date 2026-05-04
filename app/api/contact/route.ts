import { Resend } from "resend";
import { EMAIL_ADDRESS } from "@/features/about-me/function";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { from, subject, body } = await request.json();

    if (!from || !subject || !body) {
      return Response.json(
        { error: "Missing required fields" },
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
