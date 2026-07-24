import { createFileRoute } from "@tanstack/react-router";
import { MobileFrame } from "@/components/mobile-frame";
import { TopBar } from "@/components/top-bar";
import { Shield, Lock, Eye, Database, Cookie, UserCheck } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy Policy · Velocity" }] }),
  component: Privacy,
});

const pillars = [
  { icon: Shield, color: "from-emerald-400 to-teal-500", h: "Only what we need", p: "Just name, email, phone and payment to issue tickets." },
  { icon: Lock, color: "from-orange-400 to-red-500", h: "Encrypted end-to-end", p: "TLS in transit, AES-256 at rest, PCI-DSS payments." },
  { icon: Eye, color: "from-fuchsia-400 to-pink-500", h: "No selling. Ever.", p: "We never sell or rent data to advertisers." },
  { icon: Database, color: "from-sky-400 to-indigo-500", h: "You own it", p: "Export or delete your account anytime." },
];

const clauses = [
  { icon: UserCheck, color: "from-orange-400 to-amber-500", h: "1. Data we collect", p: "Account details (name, email, phone), booking history, device metadata, and coarse location when you allow it." },
  { icon: Cookie, color: "from-fuchsia-400 to-pink-500", h: "2. How we use it", p: "To issue tickets, notify you of trip updates, prevent fraud, and personalise routes and offers. Never for third-party advertising." },
  { icon: Shield, color: "from-emerald-400 to-teal-500", h: "3. Sharing", p: "Only the minimum needed with bus operators, payment processors, and legal authorities when required by law." },
  { icon: Eye, color: "from-sky-400 to-indigo-500", h: "4. Your rights", p: "Request access, correction or deletion of your personal data any time by writing to privacy@velocity.app." },
  { icon: Database, color: "from-yellow-400 to-orange-500", h: "5. Retention", p: "Booking records retained 7 years for accounting. Marketing preferences can be revoked at any time." },
];

function Privacy() {
  return (
    <MobileFrame>
      <div className="relative h-full w-full gradient-dawn flex flex-col overflow-hidden">
        <div className="pointer-events-none absolute -top-20 -right-16 size-64 rounded-full bg-fuchsia-500/25 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 -left-24 size-72 rounded-full bg-primary/25 blur-3xl" />

        <div className="relative z-30 shrink-0 backdrop-blur-md bg-background/60 border-b border-foreground/10">
          <TopBar title="Privacy Policy" subtitle="Last updated Jul 2026" showBack right={<span className="w-10" />} />
        </div>

        <div className="relative flex-1 overflow-y-auto no-scrollbar px-5 pt-4 pb-10 stagger">
          <div className="relative overflow-hidden rounded-3xl gradient-sunrise p-5 text-primary-foreground shadow-glow">
            <div className="absolute -top-10 -right-10 size-40 rounded-full bg-white/20 blur-2xl" />
            <div className="text-[10px] font-bold uppercase tracking-widest opacity-90">
              Our promise
            </div>
            <h2 className="mt-1 font-display text-xl font-black leading-tight">
              Your journey is yours — we just help you book it.
            </h2>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {pillars.map(({ icon: Icon, h, p, color }) => (
              <div
                key={h}
                className="relative overflow-hidden rounded-2xl bg-surface/80 border border-foreground/10 p-3 shadow-soft"
              >
                <div className={`absolute -top-10 -right-10 size-24 rounded-full bg-gradient-to-br ${color} opacity-30 blur-2xl`} />
                <span className={`relative grid size-9 place-items-center rounded-xl bg-gradient-to-br ${color} text-white`}>
                  <Icon className="size-4" />
                </span>
                <div className="mt-2 font-bold text-sm">{h}</div>
                <div className="text-[11px] text-muted-foreground leading-snug mt-0.5">{p}</div>
              </div>
            ))}
          </div>

          {clauses.map((c) => (
            <section
              key={c.h}
              className="relative overflow-hidden mt-4 rounded-3xl bg-surface/80 border border-foreground/10 p-5 shadow-soft"
            >
              <div className={`absolute -top-16 -right-16 size-40 rounded-full bg-gradient-to-br ${c.color} opacity-25 blur-3xl`} />
              <div className="relative flex items-start gap-3">
                <span className={`grid size-10 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${c.color} text-white shadow-soft`}>
                  <c.icon className="size-5" />
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-base font-black">{c.h}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{c.p}</p>
                </div>
              </div>
            </section>
          ))}

          <div className="mt-6 rounded-2xl glass-strong p-4 text-center">
            <p className="text-[11px] text-muted-foreground">Contact our DPO at</p>
            <p className="mt-0.5 text-sm font-bold text-primary">privacy@velocity.app</p>
          </div>
        </div>
      </div>
    </MobileFrame>
  );
}
