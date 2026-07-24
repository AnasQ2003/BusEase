import { createFileRoute } from "@tanstack/react-router";
import { MobileFrame } from "@/components/mobile-frame";
import { TopBar } from "@/components/top-bar";
import { FileText, CreditCard, RefreshCcw, Users, Scale, Sparkles } from "lucide-react";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms of Service · Velocity" }] }),
  component: Terms,
});

const sections = [
  {
    icon: FileText,
    color: "from-orange-400 to-amber-500",
    h: "1. Acceptance of terms",
    p: "By creating a Velocity account or booking a ticket you agree to these Terms of Service and confirm you are at least 18 years old.",
  },
  {
    icon: CreditCard,
    color: "from-fuchsia-400 to-pink-500",
    h: "2. Bookings & payments",
    p: "Prices include applicable taxes. Payment is captured at booking. Seat reservations are final once a booking reference is issued.",
  },
  {
    icon: RefreshCcw,
    color: "from-emerald-400 to-teal-500",
    h: "3. Cancellations & refunds",
    p: "Refunds follow the operator's policy shown at checkout. Cancellations 24 h before departure receive a 90% refund to the original method.",
  },
  {
    icon: Users,
    color: "from-sky-400 to-indigo-500",
    h: "4. Passenger conduct",
    p: "Carry a valid ID matching the booking. We may deny boarding for prohibited items, intoxication or disruptive behaviour without refund.",
  },
  {
    icon: Scale,
    color: "from-yellow-400 to-orange-500",
    h: "5. Liability",
    p: "Velocity acts as an aggregator between passengers and operators. Liability for the physical journey rests with the operating carrier.",
  },
  {
    icon: Sparkles,
    color: "from-purple-400 to-fuchsia-500",
    h: "6. Changes to these terms",
    p: "We may update these terms from time to time. Continued use after updates constitutes acceptance of the revised terms.",
  },
];

function Terms() {
  return (
    <MobileFrame>
      <div className="relative h-full w-full gradient-dawn flex flex-col overflow-hidden">
        <div className="pointer-events-none absolute -top-20 -right-16 size-64 rounded-full bg-primary/30 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 -left-24 size-72 rounded-full bg-fuchsia-500/25 blur-3xl" />

        {/* Sticky top */}
        <div className="relative z-30 shrink-0 backdrop-blur-md bg-background/60 border-b border-foreground/10">
          <TopBar title="Terms of Service" subtitle="Last updated Jul 2026" showBack right={<span className="w-10" />} />
        </div>

        <div className="relative flex-1 overflow-y-auto no-scrollbar px-5 pt-4 pb-10 stagger">
          <div className="rounded-3xl gradient-sunrise p-5 text-primary-foreground shadow-glow overflow-hidden relative">
            <div className="absolute -top-10 -right-10 size-40 rounded-full bg-white/20 blur-2xl" />
            <div className="text-[10px] font-bold uppercase tracking-widest opacity-90">
              Read the fine print
            </div>
            <h2 className="mt-1 font-display text-xl font-black leading-tight">
              A fair ride for riders and operators alike.
            </h2>
            <p className="mt-2 text-xs opacity-90 leading-relaxed">
              Welcome to Velocity — these terms govern your use of the app, website and related services.
            </p>
          </div>

          {sections.map((s) => (
            <section
              key={s.h}
              className="mt-4 relative overflow-hidden rounded-3xl bg-surface/80 border border-foreground/10 p-5 shadow-soft"
            >
              <div className={`absolute -top-16 -right-16 size-40 rounded-full bg-gradient-to-br ${s.color} opacity-25 blur-3xl`} />
              <div className="relative flex items-start gap-3">
                <span className={`grid size-10 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${s.color} text-white shadow-soft`}>
                  <s.icon className="size-5" />
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-base font-black text-foreground">{s.h}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{s.p}</p>
                </div>
              </div>
            </section>
          ))}

          <div className="mt-6 rounded-2xl glass-strong p-4 text-center">
            <p className="text-[11px] text-muted-foreground">Questions? Reach us at</p>
            <p className="mt-0.5 text-sm font-bold text-primary">support@velocity.app</p>
          </div>
        </div>
      </div>
    </MobileFrame>
  );
}
