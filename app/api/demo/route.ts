import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { rateLimit } from "@/lib/rate-limit"
import { SITE_URL } from "@/lib/site"

interface DemoRequest {
  name: string
  email: string
  phone?: string
  clinic: string
  role?: string
  branches?: string
  message?: string
}

const limiter = rateLimit({
  interval: 15 * 60 * 1000,
  uniqueTokenPerInterval: 5,
})

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  try {
    const identifier = request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? "anonymous"
    const rl = limiter.check(identifier)
    if (!rl.success) {
      const retryAfter = Math.ceil((rl.reset - Date.now()) / 1000)
      return NextResponse.json(
        { error: "Too many requests. Please try again later.", retryAfter },
        { status: 429, headers: { "Retry-After": retryAfter.toString() } },
      )
    }

    const body = (await request.json()) as Partial<DemoRequest>
    const name = body.name?.trim() ?? ""
    const email = body.email?.trim() ?? ""
    const clinic = body.clinic?.trim() ?? ""

    if (!name || !email || !clinic) {
      return NextResponse.json({ error: "Name, email and clinic name are required" }, { status: 400 })
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    const smtpHost = process.env.SMTP_HOST
    const smtpPort = parseInt(process.env.SMTP_PORT || "587")
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS
    const fromEmail = process.env.FROM_EMAIL
    const toEmail = process.env.TO_EMAIL

    if (!smtpHost || !smtpUser || !smtpPass || !fromEmail || !toEmail) {
      console.error("Clinax demo: SMTP configuration is incomplete")
      return NextResponse.json({ error: "Email service is not configured" }, { status: 500 })
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    })

    const lines = [
      "New Clinax demo request",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${body.phone?.trim() || "-"}`,
      `Clinic: ${clinic}`,
      `Role: ${body.role?.trim() || "-"}`,
      `Branches: ${body.branches?.trim() || "-"}`,
      "",
      "Message:",
      body.message?.trim() || "-",
      "",
      `Source: ${SITE_URL}`,
      `Submitted at: ${new Date().toISOString()}`,
    ]
    const internal = lines.join("\n")

    const confirmation = [
      `Hi ${name},`,
      "",
      "Thanks for requesting a Clinax demo. We've received your details and will reach out within one business day to schedule a walkthrough built around your clinic's workflows.",
      "",
      `Clinic: ${clinic}`,
      "",
      "Best regards,",
      "The Clinax team",
    ].join("\n")

    await transporter.sendMail({
      from: `"Clinax Website" <${fromEmail}>`,
      to: toEmail,
      replyTo: email,
      subject: `Clinax demo request — ${clinic} (${name})`,
      text: internal,
      html: internal.replace(/\n/g, "<br>"),
    })

    await transporter.sendMail({
      from: `"Clinax by TrueSpur" <${fromEmail}>`,
      to: email,
      subject: "Your Clinax demo request",
      text: confirmation,
      html: confirmation.replace(/\n/g, "<br>"),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Clinax demo request failed:", error)
    return NextResponse.json({ error: "Failed to send request. Please try again later." }, { status: 500 })
  }
}
