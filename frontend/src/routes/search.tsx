import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame } from "@/components/mobile-frame";
import { TopBar } from "@/components/top-bar";
import { BottomNav } from "@/components/bottom-nav";
import { useState } from "react";
import { Filter, Star, Wifi, Zap, Snowflake, Bus } from "lucide-react";
import { SideDrawer } from "@/components/side-drawer";

export const Route = createFileRoute("/search")({
  head: () => ({ meta: [{ title: "Search results · Velocity" }] }),
  component: SearchResults,
});

type BusItem = {
  op: string;
  type: string;
  category: "AC Sleeper" | "Non-AC" | "Volvo" | "Express";
  isVolvo: boolean;
  dep: string;
  arr: string;
  dur: string;
  from: string;
  to: string;
  rating: number;
  seats: number;
  price: number;
  perks: (typeof Wifi)[];
};

const BUSES: BusItem[] = [
  {
    op: "Zingbus Premium",
    type: "AC Sleeper (2+1)",
    category: "AC Sleeper",
    isVolvo: true,
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
    category: "AC Sleeper",
    isVolvo: false,
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
    category: "AC Sleeper",
    isVolvo: true,
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
  {
    op: "HRTC Express",
    type: "Non-AC Seater",
    category: "Non-AC",
    isVolvo: false,
    dep: "07:30",
    arr: "19:45",
    dur: "12h 15m",
    from: "ISBT Kashmiri Gate",
    to: "Manali Bus Stand",
    rating: 4.2,
    seats: 12,
    price: 850,
    perks: [Zap],
  },
  {
    op: "Volvo Multi-Axle 9600",
    type: "AC Sleeper (2+1)",
    category: "Volvo",
    isVolvo: true,
    dep: "09:00",
    arr: "21:15",
    dur: "12h 15m",
    from: "Majnu Ka Tilla",
    to: "Manali Mall Rd",
    rating: 4.9,
    seats: 15,
    price: 1390,
    perks: [Wifi, Zap, Snowflake],
  },
];

const FILTERS = ["All", "AC Sleeper", "Non-AC", "Volvo", "Under ₹1,500", "Morning"];

function SearchResults() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filteredBuses = BUSES.filter((b) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "AC Sleeper") return b.type.includes("AC") && b.type.includes("Sleeper");
    if (activeFilter === "Non-AC") return b.type.includes("Non-AC");
    if (activeFilter === "Volvo") return b.isVolvo || b.op.toLowerCase().includes("volvo");
    if (activeFilter === "Under ₹1,500") return b.price <= 1500;
    if (activeFilter === "Morning") {
      const hour = parseInt(b.dep.split(":")[0], 10);
      return hour >= 5 && hour < 12;
    }
    return true;
  });

  return (
    <MobileFrame>
      <div className="relative min-h-full w-full bg-background flex flex-col">
        <div
          className="absolute inset-x-0 top-0 h-40 pointer-events-none"
          style={{
            background:
              "radial-gradient(80% 60% at 50% 0%, rgba(255,92,0,0.20) 0%, transparent 70%)",
          }}
        />
        <TopBar
          showBack
          title="Search buses"
          subtitle="Pick the ride that fits"
          onMenu={() => setDrawerOpen(true)}
          right={
            <button
              onClick={() => setActiveFilter("All")}
              className="grid size-10 place-items-center rounded-2xl glass-panel active:scale-95 transition text-primary"
            >
              <Filter className="size-4" />
            </button>
          }
        />

        <div className="relative px-5 pb-3">
          <div className="rounded-2xl glass-strong p-3 flex items-center justify-between">
            <div>
              <div className="font-display text-sm font-bold">
                Delhi <span className="text-primary">→</span> Manali
              </div>
              <div className="text-[10px] text-muted-foreground">
                Fri, 12 Oct · {filteredBuses.length} buses found
              </div>
            </div>
            <button className="text-[10px] font-semibold text-primary uppercase tracking-widest">
              Modify
            </button>
          </div>

          <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar">
            {FILTERS.map((chip) => {
              const selected = activeFilter === chip;
              return (
                <button
                  key={chip}
                  onClick={() => setActiveFilter(chip)}
                  className={
                    "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold border transition-all active:scale-95 " +
                    (selected
                      ? "gradient-primary text-primary-foreground border-transparent shadow-glow"
                      : "glass-panel text-foreground/70 border-foreground/10 hover:border-primary/40")
                  }
                >
                  {chip}
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative flex-1 overflow-y-auto no-scrollbar px-5 pb-32 space-y-3 stagger">
          {filteredBuses.length === 0 ? (
            <div className="mt-12 text-center py-10 px-4 rounded-3xl glass-panel border border-foreground/10">
              <Bus className="size-10 mx-auto text-muted-foreground/60 mb-2" />
              <h3 className="font-bold text-sm">No buses match "{activeFilter}"</h3>
              <p className="text-xs text-muted-foreground mt-1">Try selecting another filter or clear all filters.</p>
              <button
                onClick={() => setActiveFilter("All")}
                className="mt-4 px-4 py-2 rounded-xl gradient-primary text-xs font-bold text-primary-foreground shadow-glow"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredBuses.map((b) => (
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
            ))
          )}
        </div>

        <BottomNav />
        <SideDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      </div>
    </MobileFrame>
  );
}
