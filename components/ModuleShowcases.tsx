import { C, GRADIENT } from "./theme"
import { ACTIVE, Bar, Card, Chip, DONE, Line, ScreenHeader, ShowcaseShell, StatTile } from "./showcase-ui"

// Marketing showcases for the four non-clinical product tabs. Like
// ClinicalShowcase, these are deliberately simplified demonstration UIs —
// no sidebar/navigation chrome, no role badges, no identifiers or internal
// mechanics — while keeping the concept each screen exists to prove.
// One fictional clinic cast (patients and therapists) recurs across all
// five showcase screens, and headline numbers stay consistent between the
// front desk and management views.

export function FrontDeskShowcase() {
  const arrivals = [
    { t: "10:00 AM", name: "Priya Raman", d: "Post-operative knee · Visit 8", ch: "Clinic", st: "Confirmed", act: true },
    { t: "10:30 AM", name: "Kavitha Raj", d: "Frozen shoulder · Visit 6", ch: "Clinic", st: "Checked in", act: false },
    { t: "11:00 AM", name: "Lakshmi Subramanian", d: "Neurological rehab · Visit 4", ch: "Online", st: "Confirmed", act: false },
    { t: "11:30 AM", name: "Arun Kumar", d: "Low back pain · Visit 5", ch: "Clinic", st: "Scheduled", act: false },
  ]
  return (
    <ShowcaseShell label="Clinax front desk — today's appointments, arrivals and waiting queue">
      <ScreenHeader title="Front desk" sub="Arrivals, waiting room and follow-ups — one workspace" meta="Today" />
      <div className="mt-3 sm:mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
        <StatTile label="Appointments" value="41" caption="Booked today" />
        <StatTile label="Waiting" value="3" caption="Longest ~6 min" tone="amber" />
        <StatTile label="Completed" value="31" caption="Visits closed" tone="green" />
        <StatTile label="Follow-ups" value="8" caption="Due today" tone="amber" />
      </div>
      <div className="mt-3 sm:mt-4 grid lg:grid-cols-5 gap-3">
        <Card className="lg:col-span-3" title="Next arrivals" sub="Check patients in as they reach the desk">
          {arrivals.map((r) => (
            <div key={r.t} className="flex items-center gap-2.5 sm:gap-3 border-b py-2.5 last:border-0 last:pb-0 first:pt-0" style={{ borderColor: C.lavender }}>
              <span className="w-[52px] sm:w-14 shrink-0 text-[10.5px] sm:text-[11px] font-semibold tabular-nums" style={{ color: C.muted }}>{r.t}</span>
              <div className="min-w-0 flex-1">
                <p className="text-[12px] sm:text-[12.5px] font-semibold truncate" style={{ color: C.ink }}>{r.name}</p>
                <p className="text-[10.5px] sm:text-[11px] truncate" style={{ color: C.muted }}>{r.d}</p>
              </div>
              <span className="hidden sm:inline-flex"><Chip>{r.ch}</Chip></span>
              <Chip tone={r.st === "Checked in" ? "done" : "violet"}>{r.st}</Chip>
              {r.act && (
                <span className="rounded-md px-2.5 py-1 text-[10.5px] font-bold text-white whitespace-nowrap" style={{ background: C.violet }}>
                  Check in
                </span>
              )}
            </div>
          ))}
        </Card>
        <div className="lg:col-span-2 flex flex-col gap-3">
          <Card title="Waiting queue" sub="Live at the desk">
            {[
              { n: "1", name: "Kavitha Raj", w: "with Dr. Ramya" },
              { n: "2", name: "Arun Kumar", w: "with Dr. Vikram" },
            ].map((r) => (
              <div key={r.n} className="flex items-center gap-2.5 border-b py-2.5 last:border-0 last:pb-0 first:pt-0" style={{ borderColor: C.lavender }}>
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0" style={{ background: C.peach, color: C.brown }}>
                  {r.n}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-semibold truncate" style={{ color: C.ink }}>{r.name}</p>
                  <p className="text-[10.5px]" style={{ color: C.muted }}>{r.w}</p>
                </div>
                <Chip tone="warm">Waiting</Chip>
              </div>
            ))}
          </Card>
          <Card title="Today's collections" sub="Front desk money view">
            <Line k="Collected" v="₹18,000" />
            <Line k="Pending" v="₹4,000" />
            <Line k="Receipts" v="19" />
          </Card>
        </div>
      </div>
    </ShowcaseShell>
  )
}

export function ScheduleShowcase() {
  const therapists = [
    { name: "Dr. Ramya MPT", shift: "8 AM – 1 PM" },
    { name: "Dr. Vikram MPT", shift: "8 AM – 1 PM" },
    { name: "Dr. Sanjay BPT", shift: "1 – 5 PM" },
  ]
  const rows: { t: string; cells: ("free" | "off" | string)[] }[] = [
    { t: "08:00", cells: ["free", "free", "off"] },
    { t: "09:00", cells: ["Kavitha Raj", "free", "off"] },
    { t: "10:00", cells: ["Priya Raman", "Lakshmi Subramanian", "off"] },
    { t: "11:00", cells: ["free", "free", "off"] },
    { t: "13:00", cells: ["free", "free", "Arun Kumar"] },
    { t: "14:00", cells: ["free", "free", "free"] },
  ]
  return (
    <ShowcaseShell label="Clinax schedule — therapist diaries showing free and booked slots">
      <ScreenHeader title="Schedule" sub="Therapist diaries for today" meta="3 therapists on the floor" chips={<Chip tone="violet">Day view</Chip>} />
      <div className="mt-3 sm:mt-4 rounded-xl border bg-white overflow-hidden" style={{ borderColor: C.lavender }}>
        <div className="grid grid-cols-[52px_1fr_1fr_1fr] sm:grid-cols-[64px_1fr_1fr_1fr] border-b" style={{ borderColor: C.lavender, background: C.surface }}>
          <span className="px-2 py-2.5 text-[9px] sm:text-[10px] font-bold tracking-[0.08em] uppercase self-end" style={{ color: C.muted }}>Slot</span>
          {therapists.map((t) => (
            <div key={t.name} className="px-2 py-2 min-w-0">
              <p className="text-[10.5px] sm:text-[12px] font-bold truncate" style={{ color: C.ink }}>{t.name}</p>
              <p className="hidden sm:block text-[10px]" style={{ color: C.muted }}>{t.shift}</p>
            </div>
          ))}
        </div>
        {rows.map((r) => (
          <div key={r.t} className="grid grid-cols-[52px_1fr_1fr_1fr] sm:grid-cols-[64px_1fr_1fr_1fr] border-b last:border-0" style={{ borderColor: C.lavender }}>
            <span className="px-2 py-2 text-[9.5px] sm:text-[10.5px] font-semibold tabular-nums self-center" style={{ color: C.muted }}>{r.t}</span>
            {r.cells.map((cell, i) => (
              <div key={i} className="px-1 py-1 sm:px-1.5 sm:py-1.5 min-w-0">
                {cell === "free" ? (
                  <div className="rounded-md px-1.5 py-1.5 text-[9.5px] sm:text-[11px] font-semibold" style={{ background: DONE.bg, color: DONE.text }}>Free</div>
                ) : cell === "off" ? (
                  <div className="rounded-md px-1.5 py-1.5 text-[9.5px] sm:text-[11px] font-semibold" style={{ background: "#F1EDF8", color: C.muted }}>Off duty</div>
                ) : (
                  <div className="rounded-md px-1.5 py-1.5 text-[9.5px] sm:text-[11px] font-bold text-white truncate" style={{ background: C.violet }}>{cell}</div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-2.5 flex items-center gap-4">
        {[["Free", DONE.bg], ["Booked", C.violet], ["Off duty", "#F1EDF8"]].map(([l, bg]) => (
          <span key={l} className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-medium" style={{ color: C.muted }}>
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: bg }} />
            {l}
          </span>
        ))}
      </div>
    </ShowcaseShell>
  )
}

export function TherapistShowcase() {
  return (
    <ShowcaseShell label="Clinax therapist desk — next patient context and the rest of the day">
      <ScreenHeader title="Good morning, Dr. Ramya" sub="10 patients today" chips={<Chip tone="violet">Therapist desk</Chip>} />

      {/* Next patient — context carried into the session */}
      <div className="mt-3 sm:mt-4 rounded-xl border p-4 sm:p-5" style={{ background: ACTIVE.bg, borderColor: ACTIVE.border }}>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[10.5px] font-bold uppercase tracking-wide" style={{ background: DONE.bg, color: DONE.text }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: DONE.text }} />
            Waiting
          </span>
          <Chip>Therapy session</Chip>
          <span className="ml-auto text-[10px] font-bold tracking-[0.12em] uppercase" style={{ color: C.muted }}>Next patient</span>
        </div>
        <p className="mt-2.5 text-[15px] sm:text-[17px] font-bold" style={{ color: C.ink }}>10:00 AM · Priya Raman</p>
        <p className="mt-0.5 text-[11.5px] sm:text-[12px]" style={{ color: C.muted }}>Post-operative knee rehabilitation · Visit 8 · Pain 4/10</p>
        <p className="mt-2.5 text-[11.5px] sm:text-[12px] leading-[1.6]" style={{ color: C.ink }}>
          Last visit — pain down from 5 to 4/10; stairs still the limiter.
        </p>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-2.5">
        <StatTile label="Patients" value="10" caption="Today" />
        <StatTile label="Notes" value="1" caption="Awaiting review" tone="amber" />
        <StatTile label="Utilisation" value="82%" caption="Booked hours" tone="green" />
      </div>

      <div className="mt-3 grid sm:grid-cols-2 gap-3">
        <Card title="Rest of my day" sub="Upcoming patients">
          {[
            { t: "10:30 AM", name: "Kavitha Raj", d: "Frozen shoulder · Visit 6", st: "Waiting", tone: "warm" as const },
            { t: "11:00 AM", name: "Lakshmi Subramanian", d: "Neurological rehab · Visit 4", st: "Confirmed", tone: "violet" as const },
            { t: "11:30 AM", name: "Arun Kumar", d: "Low back pain · Visit 5", st: "Scheduled", tone: "muted" as const },
          ].map((r) => (
            <div key={r.t} className="flex items-center gap-2.5 border-b py-2.5 last:border-0 last:pb-0 first:pt-0" style={{ borderColor: C.lavender }}>
              <span className="w-[50px] shrink-0 text-[10.5px] font-semibold tabular-nums" style={{ color: C.muted }}>{r.t}</span>
              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-semibold truncate" style={{ color: C.ink }}>{r.name}</p>
                <p className="text-[10.5px] truncate" style={{ color: C.muted }}>{r.d}</p>
              </div>
              <Chip tone={r.tone}>{r.st}</Chip>
            </div>
          ))}
        </Card>
        <Card title="Continuity snapshot" sub="Priya Raman · progress across visits">
          <div className="flex items-end gap-1.5 sm:gap-2 h-20 sm:h-24 pt-2">
            {[35, 45, 42, 55, 62, 58, 70, 78].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-md"
                style={{ height: `${h}%`, background: i === 7 ? GRADIENT : C.lavenderTint }}
              />
            ))}
          </div>
          <p className="mt-2 text-[10.5px] sm:text-[11px]" style={{ color: C.muted }}>Pain easing · function improving over 8 visits</p>
        </Card>
      </div>
    </ShowcaseShell>
  )
}

export function ManagementShowcase() {
  return (
    <ShowcaseShell label="Clinax management dashboard — appointments, collections and therapist utilisation">
      <ScreenHeader title="Management dashboard" sub="Today — across the clinic" meta="Today" />
      <div className="mt-3 sm:mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
        <StatTile label="Appointments" value="41" caption="Booked today" />
        <StatTile label="Completed" value="31" caption="Visits closed" tone="green" />
        <StatTile label="No-shows" value="2" caption="Follow-up due" tone="amber" />
        <StatTile label="Collections" value="₹18,000" caption="Recorded today" />
        <StatTile label="Sessions" value="32" caption="Therapy sessions" />
        <StatTile label="Reviews due" value="5" caption="Awaiting a decision" tone="amber" />
      </div>
      <div className="mt-3 sm:mt-4 grid sm:grid-cols-2 gap-3">
        <Card title="Therapist utilisation" sub="Booked clinical hours">
          {[
            { name: "Dr. Ramya MPT", spec: "Post-operative & sports", pct: 82 },
            { name: "Dr. Vikram MPT", spec: "Musculoskeletal & spine", pct: 76 },
            { name: "Dr. Sanjay BPT", spec: "Sports & manual therapy", pct: 74 },
          ].map((t) => (
            <div key={t.name} className="border-b py-2.5 last:border-0 last:pb-0 first:pt-0" style={{ borderColor: C.lavender }}>
              <div className="flex items-baseline justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[12px] font-semibold truncate" style={{ color: C.ink }}>{t.name}</p>
                  <p className="text-[10.5px] truncate" style={{ color: C.muted }}>{t.spec}</p>
                </div>
                <span className="text-[12px] font-bold" style={{ color: C.ink }}>{t.pct}%</span>
              </div>
              <div className="mt-2 flex"><Bar pct={t.pct} highlight /></div>
            </div>
          ))}
        </Card>
        <Card title="Payments overview" sub="Live from invoices and receipts">
          <Line k="Collected" v="₹18,000" />
          <Line k="Pending" v="₹4,000" />
          <div className="pt-2.5">
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-[11.5px]" style={{ color: C.muted }}>Collection rate</span>
              <span className="text-[12px] font-semibold" style={{ color: C.ink }}>82%</span>
            </div>
            <div className="mt-2 flex"><Bar pct={82} highlight /></div>
          </div>
        </Card>
      </div>
    </ShowcaseShell>
  )
}
