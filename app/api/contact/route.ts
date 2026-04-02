import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 },
      );
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS?.replace(/^"|"$/g, "");

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.error("Missing SMTP configuration");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: 587,
      secure: false,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: smtpUser,
      to: smtpUser,
      subject: `New message from ${name}`,
      html: `
        <h2>New Message from Your Portfolio</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
      replyTo: email,
    };

    // Send email to your inbox
    await transporter.sendMail(mailOptions);

    // Send confirmation email to the sender
    const confirmationEmail = {
      from: smtpUser,
      to: email,
      subject: `Message Received - Thank You!`,
      html: `
        <h2>Thank You for Reaching Out!</h2>
        <p>Hi ${name},</p>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <h3>Your Message:</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
        <p style="color: #999; margin-top: 20px; font-size: 12px;">
          This is an automated confirmation email from Jake Mayores' portfolio.
        </p>
      `,
    };

    await transporter.sendMail(confirmationEmail);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 },
    );
  }
}
