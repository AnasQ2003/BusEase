import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame } from "@/components/mobile-frame";
import { TopBar } from "@/components/top-bar";
import { BottomNav } from "@/components/bottom-nav";
import { SideDrawer } from "@/components/side-drawer";
import { useState } from "react";
import heroBus from "@/assets/hero-bus.png";
import {
  ArrowLeftRight,
  Calendar,
  MapPin,
  Search,
  Zap,
  Tag,
  Bus,
} from "lucide-react";
import { useProfile, COUNTRY_ROUTES, countryOf } from "@/lib/user-store";

export const Route = createFileRoute("/home")({
  head: () => ({ meta: [{ title: "Home · Velocity" }] }),
  component: Home,
});

const quick = [
  { icon: Zap, label: "Live Track" },
  { icon: Tag, label: "Offers" },
  { icon: Bus, label: "Sleepers" },
  { icon: Calendar, label: "Schedule" },
];


function Home() {
  const [drawer, setDrawer] = useState(false);
  const profile = useProfile();
  const country = countryOf(profile.country);
  const countryData = COUNTRY_ROUTES[profile.country] ?? COUNTRY_ROUTES.PK;
  const popular = countryData.routes;
  const firstName = profile.name.split(" ")[0] || "Traveler";
  const originCity = profile.city || countryData.hub.split(",")[0];

  return (
    <MobileFrame>
      <div className="relative h-full w-full overflow-hidden bg-background">
        {/* Ambient gradient */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-96"
          style={{
            background:
              "radial-gradient(80% 60% at 50% 0%, rgba(255,120,50,0.35) 0%, transparent 70%)",
          }}
        />

        <TopBar onMenu={() => setDrawer(true)} />

        <div className="relative h-[calc(100%-64px-80px)] overflow-y-auto no-scrollbar px-5 pb-6">
          {/* Greeting */}
          <div className="animate-fade-up flex items-end justify-between">
            <div>
              <div className="text-xs text-muted-foreground">
                Good evening, <span>{country.flag}</span>
              </div>
              <h2 className="font-display text-3xl font-extrabold leading-tight">
                {firstName} <span className="text-primary">👋</span>
              </h2>
              <div className="mt-1 text-[11px] text-muted-foreground">
                Booking in {country.name}
              </div>
            </div>

            <Link
              to="/profile"
              className="grid size-11 place-items-center rounded-2xl gradient-primary text-primary-foreground font-bold shadow-glow"
            >
              {profile.avatarEmoji ? <span className="text-xl leading-none">{profile.avatarEmoji}</span> : profile.avatarInitials}
            </Link>
          </div>

          {/* 3D bus card */}
          <div className="perspective-1000 mt-5 relative h-40 overflow-hidden rounded-3xl glass-strong">
            <div className="absolute inset-0 gradient-primary opacity-90" />
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,white,transparent_40%)]" />
            <img
              src={heroBus}
              alt="Featured coach"
              width={1024}
              height={1024}
              className="absolute -right-8 -bottom-4 w-56 drop-shadow-2xl animate-float-3d"
            />
            <div className="relative p-5 max-w-[62%]">
              <div className="text-[10px] font-bold tracking-widest uppercase text-foreground/80">
                Ride of the week
              </div>
              <div className="mt-1 font-display text-lg font-extrabold leading-tight text-foreground">
                Volvo 9600<br />Multi-Axle Sleeper
              </div>
              <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-black/30 px-2 py-1 text-[10px] font-semibold text-foreground">
                From ₹1,499
              </div>
            </div>
          </div>

          {/* Search card */}
          <div className="mt-6 rounded-3xl glass-strong p-4 shadow-elevated animate-fade-up">
            <div className="relative space-y-3">
              <div className="flex items-center gap-3 rounded-2xl bg-foreground/5 px-4 py-3">
                <div className="grid size-8 place-items-center rounded-lg bg-primary/15">
                  <MapPin className="size-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    From
                  </div>
                  <div className="font-semibold text-sm truncate">{originCity}, {country.name}</div>
                </div>
              </div>

              <button
                aria-label="Swap"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 grid size-9 place-items-center rounded-full gradient-primary shadow-glow active:rotate-180 transition-transform duration-500"
              >
                <ArrowLeftRight className="size-4 text-primary-foreground" />
              </button>

              <div className="flex items-center gap-3 rounded-2xl bg-foreground/5 px-4 py-3">
                <div className="grid size-8 place-items-center rounded-lg bg-foreground/10">
                  <MapPin className="size-4 text-foreground/80" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    To
                  </div>
                  <div className="font-semibold text-sm truncate">{popular[0].to}</div>
                </div>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 rounded-2xl bg-foreground/5 px-3 py-2.5">
                <Calendar className="size-4 text-primary" />
                <div>
                  <div className="text-[9px] uppercase tracking-widest text-muted-foreground">
                    Date
                  </div>
                  <div className="text-xs font-semibold">Fri, 12 Oct</div>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-2xl bg-foreground/5 px-3 py-2.5">
                <Bus className="size-4 text-primary" />
                <div>
                  <div className="text-[9px] uppercase tracking-widest text-muted-foreground">
                    Class
                  </div>
                  <div className="text-xs font-semibold">AC Sleeper</div>
                </div>
              </div>
            </div>

            <Link
              to="/search"
              className="btn-shimmer mt-4 flex h-12 items-center justify-center gap-2 rounded-2xl gradient-primary font-bold text-primary-foreground shadow-glow active:scale-[0.98] transition-transform"
            >
              <Search className="size-4" /> Search Buses
            </Link>
          </div>

          {/* Quick actions */}
          <div className="mt-6 grid grid-cols-4 gap-3 stagger">
            {quick.map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="flex flex-col items-center gap-2 rounded-2xl glass-panel p-3 active:scale-95 transition-transform"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-primary/15">
                  <Icon className="size-5 text-primary" />
                </span>
                <span className="text-[10px] font-semibold">{label}</span>
              </button>
            ))}
          </div>

          {/* Popular routes */}
          <div className="mt-8">
            <div className="flex items-end justify-between">
              <h3 className="font-display text-lg font-bold">Popular Routes</h3>
              <button className="text-xs font-semibold text-primary">View all</button>
            </div>
            <div className="mt-3 -mx-5 flex gap-4 overflow-x-auto no-scrollbar px-5 pb-2">
              {popular.map((r, idx) => (
                <Link
                  to="/search"
                  key={r.from}
                  className="min-w-[220px] group relative overflow-hidden rounded-3xl border border-foreground/10 bg-surface p-4 active:scale-[0.98] transition-transform"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  <div className="absolute -top-10 -right-10 size-32 rounded-full bg-primary/20 blur-2xl group-hover:bg-primary/40 transition-colors" />
                  <div className="relative">
                    <div className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-primary">
                      {r.tag}
                    </div>
                    <div className="mt-3 font-display text-lg font-extrabold">
                      {r.from} <span className="text-primary">→</span> {r.to}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">{r.time} · 40+ buses</div>
                    <div className="mt-4 flex items-end justify-between">
                      <div>
                        <div className="text-[10px] text-muted-foreground">Starting from</div>
                        <div className="font-display text-xl font-extrabold">
                          {country.symbol}{r.price.toLocaleString("en-US")}
                        </div>

                      </div>
                      <div className="grid size-9 place-items-center rounded-full gradient-primary shadow-glow">
                        <ArrowLeftRight className="size-4 text-primary-foreground rotate-180" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <BottomNav />
        <SideDrawer open={drawer} onClose={() => setDrawer(false)} />
      </div>
    </MobileFrame>
  );
}
