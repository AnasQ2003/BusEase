import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame } from "@/components/mobile-frame";
import { TopBar } from "@/components/top-bar";
import { BottomNav } from "@/components/bottom-nav";
import { Filter, Star, Wifi, Zap, Snowflake } from "lucide-react";

export const Route = createFileRoute("/search")({
  head: () => ({ meta: [{ title: "Search results · Velocity" }] }),
  component: SearchResults,
});

const buses = [
  {
    op: "Zingbus Premium",
    type: "AC Sleeper (2+1)",
    dep: "21:30",
    arr: "10:00",
    dur: "12h 30m",
    from: "ISBT Kashmiri Gate",
    to: "Manali Mall Rd",
    rating: 4.7,
    seats: 18,
    price: 1850,
    perks: [Wifi, Zap, Snowflake],
  },
  {
    op: "Laxmi Holidays",
    type: "AC Semi Sleeper",
    dep: "20:00",
    arr: "09:15",
    dur: "13h 15m",
    from: "Majnu Ka Tilla",
    to: "Manali Bus Stand",
    rating: 4.4,
    seats: 6,
    price: 1499,
    perks: [Zap, Snowflake],
  },
  {
    op: "IntrCity SmartBus",
    type: "AC Sleeper (2+1)",
    dep: "22:15",
    arr: "10:45",
    dur: "12h 30m",
    from: "Kashmiri Gate",
    to: "Manali",
    rating: 4.8,
    seats: 22,
    price: 2100,
    perks: [Wifi, Zap, Snowflake],
  },
];

function SearchResults() {
  return (
    <MobileFrame>
      <div className="relative h-full w-full overflow-hidden bg-background flex flex-col">
        <div
          className="absolute inset-x-0 top-0 h-40 pointer-events-none"
          style={{
            background:
              "radial-gradient(80% 60% at 50% 0%, rgba(255,92,0,0.20) 0%, transparent 70%)",
          }}
        />
        <TopBar showBack title="Search buses" subtitle="Pick the ride that fits" right={<button className="grid size-10 place-items-center rounded-2xl glass-panel active:scale-95 transition"><Filter className="size-4" /></button>} />

        <div className="relative px-5 pb-3">
          <div className="rounded-2xl glass-strong p-3 flex items-center justify-between">
            <div>
              <div className="font-display text-sm font-bold">
                Delhi <span className="text-primary">→</span> Manali
              </div>
              <div className="text-[10px] text-muted-foreground">Fri, 12 Oct · 42 buses</div>
            </div>
            <button className="text-[10px] font-semibold text-primary uppercase tracking-widest">
              Modify
            </button>
          </div>

          <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar">
            {["All", "AC Sleeper", "Non-AC", "Volvo", "Under ₹1,500", "Morning"].map(
              (chip, i) => (
                <button
                  key={chip}
                  className={
                    "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold border transition-colors " +
                    (i === 0
                      ? "gradient-primary text-primary-foreground border-transparent shadow-glow"
                      : "glass-panel text-foreground/70 border-foreground/10")
                  }
                >
                  {chip}
                </button>
              ),
            )}
          </div>
        </div>

        <div className="relative flex-1 overflow-y-auto no-scrollbar px-5 pb-24 space-y-3 stagger">
          {buses.map((b) => (
            <Link
              to="/seats"
              key={b.op}
              className="block rounded-3xl border border-foreground/10 bg-surface p-4 active:scale-[0.99] transition-transform"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-display font-bold text-sm">{b.op}</div>
                  <div className="text-[10px] text-muted-foreground">{b.type}</div>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-green-500/15 px-2 py-0.5 text-[10px] font-bold text-green-400">
                  <Star className="size-3 fill-current" />
                  {b.rating}
                </div>
              </div>

              <div className="mt-4 flex items-center">
                <div>
                  <div className="font-display text-xl font-extrabold leading-none">{b.dep}</div>
                  <div className="mt-1 text-[10px] text-muted-foreground truncate max-w-[110px]">
                    {b.from}
                  </div>
                </div>
                <div className="flex-1 px-3">
                  <div className="text-[10px] text-center text-muted-foreground">{b.dur}</div>
                  <div className="relative mt-1 h-px bg-foreground/10">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 size-1.5 rounded-full bg-primary" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 size-1.5 rounded-full bg-foreground/40" />
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-display text-xl font-extrabold leading-none">{b.arr}</div>
                  <div className="mt-1 text-[10px] text-muted-foreground truncate max-w-[110px]">
                    {b.to}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-foreground/10 pt-3">
                <div className="flex items-center gap-2">
                  {b.perks.map((Icon, i) => (
                    <span key={i} className="grid size-7 place-items-center rounded-lg bg-foreground/5">
                      <Icon className="size-3.5 text-primary" />
                    </span>
                  ))}
                  <span className="ml-2 text-[10px] text-muted-foreground">
                    {b.seats} seats left
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-[9px] text-muted-foreground">from</div>
                  <div className="font-display text-lg font-extrabold text-primary">
                    ₹{b.price.toLocaleString("en-IN")}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <BottomNav />
      </div>
    </MobileFrame>
  );
}
