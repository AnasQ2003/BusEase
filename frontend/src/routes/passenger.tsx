import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame } from "@/components/mobile-frame";
import { TopBar } from "@/components/top-bar";
import { User, Mail, Phone } from "lucide-react";
import { useProfile, formatMoney } from "@/lib/user-store";

export const Route = createFileRoute("/passenger")({
  head: () => ({ meta: [{ title: "Passenger details · Velocity" }] }),
  component: Passenger,
});

function Passenger() {
  const profile = useProfile();
  const money = (n: number) => formatMoney(n, profile.country);
  return (
    <MobileFrame>
      <div className="relative h-full w-full overflow-hidden bg-background flex flex-col">
        <TopBar showBack title="Passenger Details" />

        <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-32 space-y-5 stagger">
          {/* Progress */}
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex-1">
                <div
                  className={
                    "h-1 rounded-full " +
                    (n <= 2 ? "gradient-primary" : "bg-foreground/10")
                  }
                />
                <div className="mt-1 text-[9px] uppercase tracking-widest text-muted-foreground">
                  {n === 1 ? "Seats" : n === 2 ? "Passengers" : "Payment"}
                </div>
              </div>
            ))}
          </div>

          {/* Passenger card */}
          {[1, 2].map((p) => (
            <div key={p} className="rounded-3xl border border-foreground/10 bg-surface p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Passenger {p}
                </div>
                <div className="text-[10px] font-bold text-primary">
                  Seat {p === 1 ? "L1" : "L2"}
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-background border border-foreground/5 px-4 h-12">
                <User className="size-4 text-muted-foreground" />
                <input
                  placeholder="Full name"
                  defaultValue={p === 1 ? profile.name : ""}
                  className="flex-1 bg-transparent text-sm outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 rounded-2xl bg-background border border-foreground/5 px-3 h-12">
                  <input
                    placeholder="Age"
                    defaultValue={p === 1 ? "28" : ""}
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </div>
                <div className="flex rounded-2xl overflow-hidden border border-foreground/5">
                  {["M", "F", "O"].map((g, i) => (
                    <button
                      key={g}
                      className={
                        "flex-1 text-xs font-bold " +
                        (i === 0
                          ? "gradient-primary text-primary-foreground"
                          : "bg-background text-foreground/60")
                      }
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Contact */}
          <div className="rounded-3xl border border-foreground/10 bg-surface p-4 space-y-3">
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
              Contact
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-background border border-foreground/5 px-4 h-12">
              <Mail className="size-4 text-muted-foreground" />
              <input placeholder="Email" defaultValue={profile.email} className="flex-1 bg-transparent text-sm outline-none" />
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-background border border-foreground/5 px-4 h-12">
              <Phone className="size-4 text-muted-foreground" />
              <input placeholder="Phone" defaultValue={profile.phone} className="flex-1 bg-transparent text-sm outline-none" />
            </div>
            <p className="text-[10px] text-muted-foreground">
              Tickets & updates will be sent here.
            </p>
          </div>

          {/* Fare */}
          <div className="rounded-3xl glass-strong p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Base fare (2 × {money(1850)})</span>
              <span>{money(3700)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Taxes & fees</span>
              <span>{money(185)}</span>
            </div>
            <div className="flex justify-between text-sm text-green-400">
              <span>Coupon DAWN10</span>
              <span>-{money(370)}</span>
            </div>
            <div className="border-t border-foreground/10 pt-2 flex justify-between font-bold">
              <span>Total</span>
              <span className="font-display text-lg">{money(3515)}</span>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 glass-strong border-t border-foreground/10 p-4 pb-6">
          <Link
            to="/payment"
            className="btn-shimmer flex h-13 h-14 items-center justify-center rounded-2xl gradient-primary font-bold text-primary-foreground shadow-glow active:scale-[0.98] transition-transform"
          >
            Proceed to Payment
          </Link>
        </div>
      </div>
    </MobileFrame>
  );
}
