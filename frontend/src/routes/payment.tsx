import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MobileFrame } from "@/components/mobile-frame";
import { TopBar } from "@/components/top-bar";
import {
  CreditCard,
  Wallet,
  Building2,
  Smartphone,
  Check,
  ShieldCheck,
  Tag,
  Sparkles,
  Lock,
  Percent,
  Clock,
  MapPin,
  ChevronRight,
  BadgeCheck,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useProfile, formatMoney, countryOf, currencyCode } from "@/lib/user-store";

const BASE_INR = 3515; // Delhi → Manali seed fare (in INR)

export const Route = createFileRoute("/payment")({
  head: () => ({ meta: [{ title: "Payment · Velocity" }] }),
  component: Payment,
});

function Payment() {
  const profile = useProfile();
  const country = countryOf(profile.country);
  const money = (n: number) => formatMoney(n, profile.country);

  const walletBalanceINR = 1240;
  const baseFareINR = 3700; // 2 x 1850
  const taxesINR = 185;
  const discountINR = 370;
  const totalINR = baseFareINR + taxesINR - discountINR;

  const methods = [
    {
      id: "card",
      label: "Credit / Debit Card",
      sub:
        country.code === "IN"
          ? "Visa · Mastercard · Rupay"
          : country.code === "PK"
          ? "Visa · Mastercard · UnionPay"
          : "Visa · Mastercard · Amex",
      icon: CreditCard,
      badge: "Instant",
    },
    {
      id: "wallet-native",
      label:
        country.code === "IN"
          ? "UPI"
          : country.code === "PK"
          ? "Easypaisa · JazzCash"
          : country.code === "AE"
          ? "Apple Pay · Samsung Pay"
          : country.code === "GB"
          ? "Apple Pay · Google Pay"
          : "Apple Pay · Google Pay",
      sub: "Fastest checkout · 1-tap",
      icon: Smartphone,
      badge: "Popular",
    },
    {
      id: "wallet",
      label: "Velocity Wallet",
      sub: `Balance ${money(walletBalanceINR)}`,
      icon: Wallet,
      badge: "5% off",
    },
    {
      id: "netbank",
      label: "Netbanking",
      sub: `50+ ${country.code === "US" ? "banks" : "banks"} supported`,
      icon: Building2,
    },
  ];

  const [sel, setSel] = useState<string>("wallet-native");
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState<{ code: string; off: number } | null>(null);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const finalINR = useMemo(
    () => Math.max(0, totalINR - (promoApplied?.off ?? 0)),
    [totalINR, promoApplied],
  );

  function applyPromo() {
    const code = promo.trim().toUpperCase();
    if (!code) return;
    // Two demo promos, discount amount stored in INR
    if (code === "FIRST200") setPromoApplied({ code, off: 200 });
    else if (code === "VEL100") setPromoApplied({ code, off: 100 });
    else setPromoApplied({ code, off: 150 }); // generic accept for demo
  }

  function handlePay() {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      navigate({
        to: "/ticket",
        search: {
          status: "upcoming",
          from: "Delhi",
          to: "Manali",
          date: "Fri, 12 Oct · 21:30",
          pnr: "VH-29384-LX10",
          price: money(finalINR),
        },
      });
    }, 1100);
  }

  return (
    <MobileFrame>
      <div className="relative h-full w-full overflow-hidden bg-background flex flex-col">
        {/* Ambient background */}
        <div className="pointer-events-none absolute inset-0 gradient-dawn opacity-70" />
        <div className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-primary/25 blur-3xl animate-glow-pulse" />

        <TopBar showBack title="Secure Checkout" />

        <div className="relative flex-1 overflow-y-auto no-scrollbar px-5 pb-36 space-y-5">
          {/* Hero amount card */}
          <div className="relative overflow-hidden rounded-[28px] p-5 shadow-elevated gradient-primary text-primary-foreground animate-fade-up">
            <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_top_right,white,transparent_55%)]" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="text-[10px] uppercase tracking-widest opacity-80">
                  Amount payable
                </div>
                <div className="inline-flex items-center gap-1 rounded-full bg-black/20 px-2 py-1 text-[9px] font-bold uppercase tracking-widest">
                  <Lock className="size-3" /> {currencyCode(profile.country)}
                </div>
              </div>
              <div className="mt-1 font-display text-4xl font-extrabold tracking-tight">
                {money(finalINR)}
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-[10px] font-semibold opacity-90">
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck className="size-3.5" /> 256-bit encrypted
                </span>
                <span className="inline-flex items-center gap-1">
                  <BadgeCheck className="size-3.5" /> Instant confirmation
                </span>
              </div>
            </div>
          </div>

          {/* Trip glance card */}
          <div className="rounded-3xl glass-strong p-4 animate-fade-up">
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Your trip
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-1 text-[9px] font-bold text-primary">
                <Sparkles className="size-3" /> Volvo Sleeper
              </span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="font-display text-lg font-extrabold">DEL</span>
              <div className="relative flex-1">
                <div className="h-px bg-foreground/15" />
                <div className="absolute left-1/2 -translate-x-1/2 -top-1.5 size-3 rounded-full bg-primary shadow-glow" />
              </div>
              <span className="font-display text-lg font-extrabold">MAN</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3" /> Fri, 12 Oct · 21:30
              </span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3" /> Seats L1, L2
              </span>
            </div>
          </div>

          {/* Payment methods */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Choose method
              </div>
              <div className="text-[10px] text-muted-foreground">
                Paying in {country.currency}
              </div>
            </div>
            <div className="space-y-3 stagger">
              {methods.map(({ id, label, sub, icon: Icon, badge }) => {
                const active = sel === id;
                return (
                  <button
                    key={id}
                    onClick={() => setSel(id)}
                    className={
                      "w-full flex items-center gap-4 rounded-3xl border p-4 text-left transition-all " +
                      (active
                        ? "border-primary/60 bg-primary/10 shadow-glow"
                        : "border-foreground/10 bg-surface hover:border-foreground/20")
                    }
                  >
                    <span
                      className={
                        "grid size-11 place-items-center rounded-2xl " +
                        (active ? "gradient-primary" : "bg-foreground/5")
                      }
                    >
                      <Icon
                        className={
                          "size-5 " +
                          (active ? "text-primary-foreground" : "text-primary")
                        }
                      />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="font-semibold text-sm truncate">{label}</div>
                        {badge && (
                          <span className="rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-emerald-500">
                            {badge}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-muted-foreground truncate">
                        {sub}
                      </div>
                    </div>
                    <span
                      className={
                        "grid size-6 place-items-center rounded-full border transition-all " +
                        (active
                          ? "gradient-primary border-transparent"
                          : "border-foreground/25")
                      }
                    >
                      {active && (
                        <Check
                          className="size-3.5 text-primary-foreground"
                          strokeWidth={3}
                        />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Card mock */}
          {sel === "card" && (
            <div className="perspective-1000 animate-fade-up">
              <div className="relative h-48 rounded-3xl p-5 overflow-hidden shadow-elevated gradient-sunrise text-primary-foreground">
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_right,white,transparent_60%)]" />
                <div className="relative flex flex-col justify-between h-full">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-semibold uppercase tracking-widest opacity-80">
                      Velocity Card
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-80">
                      {country.flag} {country.currency}
                    </div>
                  </div>
                  <div className="font-display text-lg tracking-[0.25em]">
                    •••• •••• •••• 4290
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>{profile.name}</span>
                    <span>12/28</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Promo code */}
          <div className="rounded-3xl glass-strong p-4 animate-fade-up">
            <div className="flex items-center gap-2">
              <span className="grid size-10 place-items-center rounded-2xl bg-primary/15 text-primary">
                <Tag className="size-4" />
              </span>
              <div className="flex-1">
                <div className="text-xs font-bold">Have a promo code?</div>
                <div className="text-[10px] text-muted-foreground">
                  Try FIRST200 or VEL100
                </div>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <input
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                placeholder="Enter code"
                className="flex-1 h-11 rounded-2xl bg-foreground/5 border border-foreground/10 px-4 text-sm font-semibold uppercase tracking-wider placeholder:normal-case placeholder:tracking-normal placeholder:text-muted-foreground/70 focus:outline-none focus:border-primary/60"
              />
              <button
                onClick={applyPromo}
                className="h-11 px-4 rounded-2xl gradient-primary text-primary-foreground text-xs font-bold shadow-glow active:scale-95 transition"
              >
                Apply
              </button>
            </div>
            {promoApplied && (
              <div className="mt-3 flex items-center justify-between rounded-2xl bg-emerald-500/10 border border-emerald-500/30 px-3 py-2 text-emerald-500 text-xs font-bold">
                <span className="inline-flex items-center gap-1">
                  <Percent className="size-3.5" /> {promoApplied.code} applied
                </span>
                <span>-{money(promoApplied.off)}</span>
              </div>
            )}
          </div>

          {/* Fare breakdown */}
          <div className="rounded-3xl glass-strong p-5 animate-fade-up">
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
              Fare breakdown
            </div>
            <div className="space-y-2 text-sm">
              <Row label="Base fare (2 × seats)" value={money(baseFareINR)} />
              <Row label="Taxes & fees" value={money(taxesINR)} />
              <Row
                label="Instant discount"
                value={`-${money(discountINR)}`}
                positive
              />
              {promoApplied && (
                <Row
                  label={`Promo ${promoApplied.code}`}
                  value={`-${money(promoApplied.off)}`}
                  positive
                />
              )}
            </div>
            <div className="mt-4 border-t border-dashed border-foreground/15 pt-3 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Total
              </span>
              <span className="font-display text-2xl font-extrabold">
                {money(finalINR)}
              </span>
            </div>
            <div className="mt-2 text-[10px] text-emerald-500 font-semibold">
              You save {money(discountINR + (promoApplied?.off ?? 0))} on this booking
            </div>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { i: ShieldCheck, l: "PCI DSS" },
              { i: Lock, l: "3-D Secure" },
              { i: BadgeCheck, l: "Refundable" },
            ].map((t) => (
              <div
                key={t.l}
                className="flex flex-col items-center gap-1 rounded-2xl bg-foreground/5 py-3"
              >
                <t.i className="size-4 text-primary" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                  {t.l}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Sticky pay bar */}
        <div className="absolute inset-x-0 bottom-0 glass-strong border-t border-foreground/10 p-4 pb-6">
          <div className="mb-2 flex items-center justify-between text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="size-3.5 text-emerald-500" /> Safe checkout
            </span>
            <span>
              Paying <strong className="text-foreground">{money(finalINR)}</strong>
            </span>
          </div>
          <button
            onClick={handlePay}
            disabled={processing}
            className="btn-shimmer flex h-14 w-full items-center justify-center gap-2 rounded-2xl gradient-primary font-bold text-primary-foreground shadow-glow active:scale-[0.98] transition-transform disabled:opacity-70"
          >
            {processing ? (
              <>
                <span className="size-4 rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground animate-spin" />
                Processing…
              </>
            ) : (
              <>
                Pay {money(finalINR)}
                <ChevronRight className="size-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </MobileFrame>
  );
}

function Row({
  label,
  value,
  positive,
}: {
  label: string;
  value: string;
  positive?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={"font-semibold " + (positive ? "text-emerald-500" : "")}>
        {value}
      </span>
    </div>
  );
}
