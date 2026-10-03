"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { C, GRADIENT, HEADING } from "./theme"
import { CTA } from "./content"
import { ArrowIcon } from "./ui"

interface FormState {
  name: string
  email: string
  phone: string
  clinic: string
  role: string
  branches: string
  message: string
}

const EMPTY: FormState = { name: "", email: "", phone: "", clinic: "", role: "", branches: "", message: "" }

const ROLE_OPTIONS = ["Clinic owner / founder", "Clinic manager", "Physiotherapist / clinician", "Reception / operations", "Other"]
const BRANCH_OPTIONS = ["1 branch", "2–3 branches", "4–6 branches", "7+ branches"]
const INTEREST_OPTIONS = [
  "Appointments & scheduling",
  "Reception operations",
  "Clinical documentation",
  "Therapist workflow",
  "Multi-branch management",
  "Reporting & dashboards",
  "Patient follow-up",
  "Full platform walkthrough",
]

const inputCls =
  "w-full rounded-xl px-4 py-3 text-[15px] outline-none transition-shadow duration-150 focus:shadow-[0_0_0_3px_rgba(91,15,193,0.18)] placeholder:text-[#9C93AE]"
const inputStyle = { background: C.white, border: `1px solid ${C.lavender}`, color: C.ink }

function Field({ label, htmlFor, required, error, children }: { label: string; htmlFor: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-[12.5px] font-semibold" style={{ color: C.ink }}>
        {label} {required && <span style={{ color: C.magenta }}>*</span>}
      </label>
      {children}
      {error && (
        <p className="text-[12px] font-medium" style={{ color: "#B3261E" }} role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export default function DemoForm() {
  const [form, setForm] = useState<FormState>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [serverMsg, setServerMsg] = useState("")

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const validate = () => {
    const er: typeof errors = {}
    if (!form.name.trim()) er.name = "Please enter your name"
    if (!form.email.trim()) er.email = "Please enter your work email"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) er.email = "Please enter a valid email"
    if (!form.clinic.trim()) er.clinic = "Please enter your clinic name"
    setErrors(er)
    return Object.keys(er).length === 0
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus("submitting")
    setServerMsg("")
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || "Something went wrong")
      setStatus("success")
      setForm(EMPTY)
    } catch (err) {
      setStatus("error")
      setServerMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl p-8 sm:p-10 text-center" style={{ background: C.white, border: `1px solid ${C.lavender}` }}>
        <span className="mx-auto w-14 h-14 rounded-full flex items-center justify-center" style={{ background: GRADIENT }}>
          <svg width="24" height="24" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M2 5.2l2.2 2.2L8 3" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className="mt-6 text-[1.6rem] font-bold" style={{ ...HEADING, color: C.ink }}>
          Demo request received.
        </h3>
        <p className="mt-3 text-[15px] leading-[1.65]" style={{ color: C.muted }}>
          We&apos;ll be in touch within one business day to schedule your walkthrough. A confirmation has been sent to your email.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-6 text-[14px] font-semibold cursor-pointer hover:underline underline-offset-4" style={{ color: C.violet }}>
          Send another request
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-3xl p-6 sm:p-8 flex flex-col gap-5" style={{ background: C.white, border: `1px solid ${C.lavender}` }}>
      <div>
        <h3 className="text-[1.5rem] font-bold" style={{ ...HEADING, color: C.ink }}>
          Book a demo
        </h3>
        <p className="mt-1 text-[14px]" style={{ color: C.muted }}>
          Tell us about your clinic — we&apos;ll schedule a walkthrough around your workflows.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Your name" htmlFor="cx2-name" required error={errors.name}>
          <input id="cx2-name" name="name" value={form.name} onChange={set("name")} className={inputCls} style={inputStyle} placeholder="Dr. Priya Raman" autoComplete="name" />
        </Field>
        <Field label="Work email" htmlFor="cx2-email" required error={errors.email}>
          <input id="cx2-email" name="email" type="email" value={form.email} onChange={set("email")} className={inputCls} style={inputStyle} placeholder="you@yourclinic.com" autoComplete="email" />
        </Field>
        <Field label="Phone" htmlFor="cx2-phone">
          <input id="cx2-phone" name="phone" type="tel" value={form.phone} onChange={set("phone")} className={inputCls} style={inputStyle} placeholder="+91 98765 43210" autoComplete="tel" />
        </Field>
        <Field label="Clinic name" htmlFor="cx2-clinic" required error={errors.clinic}>
          <input id="cx2-clinic" name="clinic" value={form.clinic} onChange={set("clinic")} className={inputCls} style={inputStyle} placeholder="Your clinic" autoComplete="organization" />
        </Field>
        <Field label="Your role" htmlFor="cx2-role">
          <select id="cx2-role" name="role" value={form.role} onChange={set("role")} className={inputCls} style={inputStyle}>
            <option value="">Select…</option>
            {ROLE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
          </select>
        </Field>
        <Field label="Number of branches" htmlFor="cx2-branches">
          <select id="cx2-branches" name="branches" value={form.branches} onChange={set("branches")} className={inputCls} style={inputStyle}>
            <option value="">Select…</option>
            {BRANCH_OPTIONS.map((o) => <option key={o}>{o}</option>)}
          </select>
        </Field>
      </div>

      <Field label="What would you like to see?" htmlFor="cx2-message">
        <select id="cx2-message" name="message" value={form.message} onChange={set("message")} className={inputCls} style={inputStyle}>
          <option value="">Select…</option>
          {INTEREST_OPTIONS.map((o) => <option key={o}>{o}</option>)}
        </select>
      </Field>

      {status === "error" && (
        <p className="text-[13px] font-medium rounded-xl px-4 py-3" style={{ background: C.peach, color: C.brown }} role="alert">
          {serverMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-4 text-[15px] font-semibold text-white cursor-pointer disabled:opacity-70 disabled:cursor-wait transition-transform duration-200 hover:-translate-y-0.5 shadow-[0_14px_34px_-12px_rgba(91,15,193,0.7)]"
        style={{ background: GRADIENT }}
      >
        {status === "submitting" ? "Sending…" : CTA.primary}
        {status !== "submitting" && (
          <span className="transition-transform duration-200 group-hover:translate-x-0.5">
            <ArrowIcon />
          </span>
        )}
      </button>

      <p className="text-[12px] text-center" style={{ color: C.muted }}>
        Your information is only used to respond to your request and is never shared. See our{" "}
        <Link href="/privacy" className="underline underline-offset-2" style={{ color: C.violet }}>
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  )
}
