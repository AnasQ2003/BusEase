import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame } from "@/components/mobile-frame";
import { TopBar } from "@/components/top-bar";
import { BottomNav } from "@/components/bottom-nav";
import { SideDrawer } from "@/components/side-drawer";
import { useMemo, useState } from "react";
import { Bus, Clock, CheckCircle2, XCircle, Star, Zap, MapPin, QrCode } from "lucide-react";
import { useProfile, formatMoney } from "@/lib/user-store";
import { useTicketOverrides, daysUntil } from "@/lib/tickets-store";

export const Route = createFileRoute("/tickets")({
  head: () => ({ meta: [{ title: "My tickets · Velocity" }] }),
  component: Tickets,
});

type TripStatus = "upcoming" | "completed" | "cancelled";

type Trip = {
  status: TripStatus;
  from: string;
  to: string;
  date: string;
  pnr: string;
  priceINR: number;
  rating?: number;
};

// Base seed trips (prices in INR — formatted per user country at render)
const SEED: Trip[] = [
  { status: "upcoming", from: "Delhi", to: "Manali", date: "Fri, 12 Oct · 21:30", pnr: "VH-29384-LX10", priceINR: 3515 },
  { status: "upcoming", from: "Karachi", to: "Lahore", date: "Sun, 20 Oct · 20:00", pnr: "VH-55440-KL22", priceINR: 4500 },
  { status: "completed", from: "Mumbai", to: "Goa", date: "Sat, 3 Aug · 22:15", pnr: "VH-12100-MG04", priceINR: 2450, rating: 5 },
  { status: "completed", from: "Bangalore", to: "Coorg", date: "Sun, 21 Jul · 06:00", pnr: "VH-99283-BC02", priceINR: 1299, rating: 4 },
  { status: "cancelled", from: "Jaipur", to: "Udaipur", date: "Thu, 8 Jun · 08:00", pnr: "VH-77812-JU08", priceINR: 1100 },
];

const TABS: TripStatus[] = ["upcoming", "completed", "cancelled"];

function Tickets() {
  const [drawer, setDrawer] = useState(false);
  const [tab, setTab] = useState<TripStatus>("upcoming");
  const profile = useProfile();
  const overrides = useTicketOverrides();

  // Merge base seeds with local overrides (status/date)
  const trips = useMemo(() => {
    return SEED.map((t) => {
      const o = overrides[t.pnr] ?? {};
      return { ...t, status: o.status ?? t.status, date: o.date ?? t.date };
    });
  }, [overrides]);

  const visible = trips.filter((t) => t.status === tab);

  return (
    <MobileFrame>
      <div className="relative h-full w-full overflow-hidden bg-background">
        <TopBar title="My Trips" onMenu={() => setDrawer(true)} />

        <div className="px-5 mb-3 flex gap-2">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={
                "flex-1 h-9 rounded-full text-xs font-bold capitalize transition-all " +
                (tab === t
                  ? "gradient-primary text-primary-foreground shadow-glow"
                  : "glass-panel text-foreground/70")
              }
            >
              {t}
            </button>
          ))}
        </div>

        <div className="h-[calc(100%-64px-80px-52px)] overflow-y-auto no-scrollbar px-5 pb-6 space-y-3 stagger">
          {visible.length === 0 && (
            <div className="mt-16 flex flex-col items-center text-center text-muted-foreground">
              <div className="grid size-16 place-items-center rounded-3xl glass-panel mb-3">
                <Clock className="size-6 text-primary" />
              </div>
              <div className="font-display text-sm font-bold text-foreground">
                No {tab} trips
              </div>
              <div className="text-xs mt-1">They'll appear here once available.</div>
            </div>
          )}

          {visible.map((t) => {
            const isUp = t.status === "upcoming";
            const isDone = t.status === "completed";
            const isCanc = t.status === "cancelled";

            const days = isUp ? daysUntil(t.date) : Number.POSITIVE_INFINITY;
            const isNear = isUp && days <= 3; // very near = green
            const priceStr = formatMoney(t.priceINR, profile.country);

            // Color theme resolution
            const cardBorder = isCanc
              ? "border-red-500/40 bg-red-500/5"
              : isNear
              ? "border-emerald-500/50 bg-emerald-500/5 shadow-glow"
              : isUp
              ? "border-amber-500/45 bg-amber-500/5"
              : "border-foreground/10 bg-surface/60";

            const chipTone = isCanc
              ? "bg-red-500/15 text-red-500"
              : isNear
              ? "bg-emerald-500/15 text-emerald-500"
              : isUp
              ? "bg-amber-500/15 text-amber-500"
              : "bg-emerald-500/15 text-emerald-500";

            const chipLabel = isCanc
              ? "Cancelled"
              : isNear
              ? `Boarding in ${days === 0 ? "today" : days === 1 ? "1 day" : days + " days"}`
              : isUp
              ? "Upcoming"
              : "Completed";

            const chipIcon = isCanc ? (
              <XCircle className="size-3" />
            ) : isNear ? (
              <Zap className="size-3" />
            ) : isUp ? (
              <Clock className="size-3" />
            ) : (
              <CheckCircle2 className="size-3" />
            );

            return (
              <Link
                to="/ticket"
                search={{
                  status: t.status,
                  from: t.from,
                  to: t.to,
                  date: t.date,
                  pnr: t.pnr,
                  price: priceStr,
                }}
                key={t.pnr}
                className={
                  "relative block rounded-3xl border overflow-hidden active:scale-[0.99] transition-transform " +
                  cardBorder
                }
              >
                {/* Perforation notches (ticket look) */}
                <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 size-5 rounded-full bg-background border border-foreground/10" />
                <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 size-5 rounded-full bg-background border border-foreground/10" />
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={
                        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest " +
                        chipTone
                      }
                    >
                      {chipIcon}
                      {chipLabel}
                    </div>
                    <div
                      className={
                        "font-display text-sm font-bold " +
                        (isCanc ? "line-through text-red-500/70" : "")
                      }
                    >
                      {priceStr}
                    </div>
                  </div>

                  <div
                    className={
                      "mt-4 flex items-center gap-3 " +
                      (isDone ? "grayscale-[30%]" : isCanc ? "opacity-70" : "")
                    }
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                        <MapPin className="size-2.5" /> From
                      </div>
                      <div className={"font-display text-2xl font-extrabold leading-tight " + (isCanc ? "line-through" : "")}>
                        {t.from}
                      </div>
                    </div>
                    <div className="flex-1 relative h-10 flex items-center">
                      {/* dashed route with stations */}
                      <span
                        className={
                          "absolute left-0 top-1/2 -translate-y-1/2 size-2 rounded-full ring-2 " +
                          (isCanc
                            ? "bg-red-500 ring-red-500/30"
                            : isNear
                            ? "bg-emerald-500 ring-emerald-500/30"
                            : isUp
                            ? "bg-amber-500 ring-amber-500/30"
                            : "bg-primary ring-primary/30")
                        }
                      />
                      <span
                        className={
                          "absolute right-0 top-1/2 -translate-y-1/2 size-2 rounded-full ring-2 " +
                          (isCanc
                            ? "bg-red-500 ring-red-500/30"
                            : isNear
                            ? "bg-emerald-500 ring-emerald-500/30"
                            : isUp
                            ? "bg-amber-500 ring-amber-500/30"
                            : "bg-primary ring-primary/30")
                        }
                      />
                      <span
                        className={
                          "absolute inset-x-3 top-1/2 -translate-y-1/2 border-t border-dashed " +
                          (isCanc
                            ? "border-red-500/40"
                            : isNear
                            ? "border-emerald-500/50"
                            : isUp
                            ? "border-amber-500/50"
                            : "border-foreground/20")
                        }
                      />
                      <span
                        className={
                          "absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 grid size-8 place-items-center rounded-xl border-2 border-background shadow-glow " +
                          (isCanc
                            ? "bg-red-500 text-white"
                            : isNear
                            ? "bg-emerald-500 text-white"
                            : isUp
                            ? "bg-amber-500 text-white"
                            : "gradient-primary text-primary-foreground")
                        }
                      >
                        <Bus className="size-4" strokeWidth={2.5} />
                      </span>
                    </div>
                    <div className="min-w-0 text-right">
                      <div className="flex items-center justify-end gap-1 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                        To <MapPin className="size-2.5" />
                      </div>
                      <div className={"font-display text-2xl font-extrabold leading-tight " + (isCanc ? "line-through" : "")}>
                        {t.to}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground border-t border-dashed border-foreground/10 pt-3">
                    <span className="flex items-center gap-1.5">
                      <Clock className="size-3 text-primary" /> {t.date}
                    </span>
                    <span className="flex items-center gap-1 font-mono">
                      <QrCode className="size-3" /> {t.pnr}
                    </span>
                  </div>

                  {isDone && t.rating && (
                    <div className="mt-3 flex items-center gap-1 text-[11px] text-emerald-500 font-semibold">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={
                            "size-3 " +
                            (i < t.rating! ? "fill-current" : "opacity-30")
                          }
                        />
                      ))}
                      <span className="ml-1 text-muted-foreground">
                        You rated this trip
                      </span>
                    </div>
                  )}
                </div>

                {isUp && (
                  <div
                    className={
                      "border-t grid grid-cols-2 divide-x " +
                      (isNear
                        ? "border-emerald-500/20 divide-emerald-500/20"
                        : "border-amber-500/20 divide-amber-500/20")
                    }
                  >
                    <div
                      className={
                        "py-3 text-center text-xs font-bold " +
                        (isNear ? "text-emerald-500" : "text-amber-500")
                      }
                    >
                      {isNear ? "Departing soon" : "Scheduled"}
                    </div>
                    <div className="py-3 text-center text-xs font-semibold text-primary">
                      View ticket
                    </div>
                  </div>
                )}
                {isDone && (
                  <div className="border-t border-foreground/5 grid grid-cols-2 divide-x divide-foreground/5">
                    <button className="py-3 text-xs font-semibold text-emerald-500">
                      Rebook
                    </button>
                    <button className="py-3 text-xs font-semibold text-foreground/70">
                      Invoice
                    </button>
                  </div>
                )}
                {isCanc && (
                  <div className="border-t border-red-500/20 grid grid-cols-2 divide-x divide-red-500/20">
                    <div className="py-3 text-center text-xs font-bold text-red-500 uppercase tracking-widest">
                      Cancelled
                    </div>
                    <div className="py-3 text-center text-xs font-semibold text-muted-foreground">
                      Refunded to wallet
                    </div>
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        <BottomNav />
        <SideDrawer open={drawer} onClose={() => setDrawer(false)} />
      </div>
    </MobileFrame>
  );
}
