import { NextResponse } from "next/server";
import { Resend } from "resend";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY environment variable.");
  }
  return new Resend(apiKey);
}

export async function POST(req: Request) {
  try {
    const resend = getResendClient();
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }

    const { error } = await resend.emails.send({
      from: "IIK Contact Form <onboarding@resend.dev>",
      to: "prabalhc@gmail.com",
      replyTo: email,
      subject: `[IIK Contact] ${subject}`,
      html: `
        <div style="font-family:'Plus Jakarta Sans', system-ui, sans-serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #fed7aa;border-radius:12px;">
          <h2 style="color:#ea580c;margin-bottom:4px;">New Message — Indians in Korea</h2>
          <p style="color:#9ca3af;font-size:13px;margin-top:0;">Submitted via the IIK Contact Form</p>
          <hr style="border:none;border-top:1px solid #ffedd5;margin:20px 0;" />
          <table style="width:100%;font-size:14px;color:#374151;">
            <tr><td style="padding:8px 0;font-weight:600;width:100px;">Name</td><td>${name}</td></tr>
            <tr><td style="padding:8px 0;font-weight:600;">Email</td><td><a href="mailto:${email}" style="color:#f97316;">${email}</a></td></tr>
            <tr><td style="padding:8px 0;font-weight:600;">Subject</td><td>${subject}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #ffedd5;margin:20px 0;" />
          <p style="font-weight:600;color:#374151;margin-bottom:8px;">Message</p>
          <p style="color:#4b5563;line-height:1.7;white-space:pre-wrap;">${message}</p>
          <hr style="border:none;border-top:1px solid #ffedd5;margin:20px 0;" />
          <p style="font-size:11px;color:#d1d5db;">Hit reply to respond directly to ${name}.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
