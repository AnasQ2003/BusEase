import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame } from "@/components/mobile-frame";
import { TopBar } from "@/components/top-bar";
import { BottomNav } from "@/components/bottom-nav";
import { Wallet, ArrowUpRight, ArrowDownLeft, Gift, Plus, Sparkles, Percent, Tag } from "lucide-react";
import { useProfile, countryOf, formatMoney } from "@/lib/user-store";

export const Route = createFileRoute("/wallet")({
  head: () => ({
    meta: [
      { title: "Wallet · Velocity" },
      { name: "description", content: "Your Velocity wallet balance, cashback and payout history." },
    ],
  }),
  component: WalletPage,
});

const activity = [
  { kind: "in" as const, label: "Cashback · KHI → LHR", amount: 240, date: "Today · 10:24" },
  { kind: "out" as const, label: "Ticket · Delhi → Manali", amount: 3515, date: "Yesterday" },
  { kind: "in" as const, label: "Referral bonus · Ahmed", amount: 200, date: "12 Oct" },
  { kind: "in" as const, label: "Wallet top-up", amount: 1000, date: "05 Oct" },
  { kind: "out" as const, label: "Ticket · Mumbai → Goa", amount: 2450, date: "03 Aug" },
];

function WalletPage() {
  const profile = useProfile();
  const country = countryOf(profile.country);
  const bal = 1240;

  return (
    <MobileFrame>
      <div className="relative min-h-full w-full bg-background flex flex-col">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-72"
          style={{ background: "radial-gradient(80% 60% at 50% 0%, rgba(255,120,50,0.35) 0%, transparent 70%)" }}
        />
        <TopBar showBack title="Wallet & Offers" />

        <div className="relative flex-1 overflow-y-auto no-scrollbar px-5 pb-32">
          {/* Balance card */}
          <div className="relative overflow-hidden rounded-3xl p-5 gradient-sunrise text-primary-foreground shadow-glow animate-fade-up">
            <div className="absolute -top-14 -right-14 size-44 rounded-full bg-white/20 blur-2xl" />
            <div className="absolute -bottom-10 -left-10 size-32 rounded-full bg-fuchsia-500/40 blur-2xl" />
            <div className="relative flex items-center justify-between">
              <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold bg-black/25 rounded-full px-2.5 py-1">
                <Wallet className="size-3" /> Velocity Wallet
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-90">
                {country.currency}
              </span>
            </div>
            <div className="relative mt-5">
              <div className="text-[11px] opacity-90">Available balance</div>
              <div className="font-display text-4xl font-black leading-none mt-1">
                {formatMoney(bal, profile.country)}
              </div>
              <div className="mt-2 text-[11px] opacity-90">Auto-applied at checkout</div>
            </div>
            <div className="relative mt-5 grid grid-cols-3 gap-2 text-center">
              <button className="rounded-2xl bg-white/15 backdrop-blur py-2.5 text-xs font-bold active:scale-95 transition">
                <Plus className="size-4 mx-auto mb-1" />
                Add money
              </button>
              <button className="rounded-2xl bg-white/15 backdrop-blur py-2.5 text-xs font-bold active:scale-95 transition">
                <ArrowUpRight className="size-4 mx-auto mb-1" />
                Send
              </button>
              <Link
                to="/refer"
                className="rounded-2xl bg-white/15 backdrop-blur py-2.5 text-xs font-bold active:scale-95 transition"
              >
                <Gift className="size-4 mx-auto mb-1" />
                Earn ₹200
              </Link>
            </div>
          </div>

          {/* Coupons */}
          <div className="mt-6">
            <div className="flex items-end justify-between mb-3">
              <h3 className="font-display text-lg font-bold">Coupons for you</h3>
              <Link to="/offers" className="text-xs font-semibold text-primary">See all</Link>
            </div>
            <div className="-mx-5 flex gap-3 overflow-x-auto no-scrollbar px-5 pb-2">
              {[
                { code: "FIRST200", off: "₹200 off", note: "on your first ride", tint: "from-primary/25 to-fuchsia-500/25", icon: Sparkles },
                { code: "VEL100",  off: "10% off",  note: "on sleeper coaches", tint: "from-emerald-500/20 to-primary/20", icon: Percent },
                { code: "WEEKEND", off: "₹150 off", note: "Fri–Sun departures", tint: "from-amber-400/25 to-primary/20", icon: Tag },
              ].map((c) => (
                <div
                  key={c.code}
                  className={`min-w-[220px] rounded-3xl border border-foreground/10 bg-gradient-to-br ${c.tint} p-4`}
                >
                  <div className="flex items-center gap-2">
                    <span className="grid size-9 place-items-center rounded-2xl bg-primary/20 text-primary">
                      <c.icon className="size-4" />
                    </span>
                    <div className="font-display text-lg font-extrabold">{c.off}</div>
                  </div>
                  <div className="mt-2 text-[11px] text-muted-foreground">{c.note}</div>
                  <div className="mt-3 flex items-center justify-between rounded-xl border border-dashed border-foreground/25 px-3 py-2">
                    <span className="font-mono text-xs font-bold tracking-widest">{c.code}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Copy</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity */}
          <div className="mt-6">
            <h3 className="font-display text-lg font-bold mb-3">Recent activity</h3>
            <div className="rounded-3xl glass-panel divide-y divide-foreground/5">
              {activity.map((a, i) => {
                const isIn = a.kind === "in";
                return (
                  <div key={i} className="flex items-center gap-3 px-4 py-3">
                    <span
                      className={
                        "grid size-10 place-items-center rounded-2xl " +
                        (isIn ? "bg-emerald-500/15 text-emerald-500" : "bg-red-500/15 text-red-500")
                      }
                    >
                      {isIn ? <ArrowDownLeft className="size-4" /> : <ArrowUpRight className="size-4" />}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold truncate">{a.label}</div>
                      <div className="text-[10px] text-muted-foreground">{a.date}</div>
                    </div>
                    <div
                      className={
                        "text-sm font-display font-extrabold " +
                        (isIn ? "text-emerald-500" : "text-red-500")
                      }
                    >
                      {isIn ? "+" : "−"} {formatMoney(a.amount, profile.country)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <BottomNav />
      </div>
    </MobileFrame>
  );
}
