import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame } from "@/components/mobile-frame";
import { TopBar } from "@/components/top-bar";
import { BottomNav } from "@/components/bottom-nav";
import { SideDrawer } from "@/components/side-drawer";
import { useState } from "react";
import { Ticket, Award, MapPin, Wallet, ChevronRight, Bell } from "lucide-react";
import { useProfile, countryOf } from "@/lib/user-store";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile · Velocity" }] }),
  component: Profile,
});

const stats = [
  { icon: Ticket, label: "Trips", value: "12" },
  { icon: MapPin, label: "Cities", value: "8" },
  { icon: Award, label: "Tier", value: "Gold" },
];

const rows = [
  { label: "Personal information", to: "/personal-info" },
  { label: "Saved passengers", to: "/passenger" },
  { label: "Payment methods", to: "/payment" },
  { label: "Ride history", to: "/tickets" },
  { label: "Refer & earn", to: "/offers", accent: true },
];


function Profile() {
  const profile = useProfile();
  const country = countryOf(profile.country);
  const [drawer, setDrawer] = useState(false);
  return (
    <MobileFrame>
      <div className="relative min-h-full w-full bg-background flex flex-col">
        <div
          className="absolute inset-x-0 top-0 h-72 pointer-events-none"
          style={{
            background:
              "radial-gradient(70% 60% at 50% 0%, rgba(255,120,50,0.35) 0%, transparent 70%)",
          }}
        />
        <TopBar
          onMenu={() => setDrawer(true)}
          right={
            <Link
              to="/notifications"
              aria-label="Notifications"
              className="relative grid size-10 place-items-center rounded-2xl glass-panel active:scale-95 transition"
            >
              <Bell className="size-4" />
              <span className="absolute right-2 top-2 size-2 rounded-full bg-primary shadow-glow animate-glow-pulse" />
            </Link>
          }
        />

        <div className="relative flex-1 overflow-y-auto no-scrollbar px-5 pb-32">
          {/* Avatar card */}
          <div className="flex flex-col items-center pt-2 pb-6 animate-fade-up">
            <div className="relative">
              <div className="grid size-24 place-items-center rounded-[28px] gradient-sunrise text-primary-foreground font-display text-3xl font-extrabold shadow-glow">
                {profile.avatarEmoji ? <span className="text-5xl leading-none">{profile.avatarEmoji}</span> : profile.avatarInitials}
              </div>
              <div className="absolute -bottom-1 -right-1 grid size-7 place-items-center rounded-full bg-background border-2 border-primary">
                <Award className="size-3.5 text-primary" />
              </div>
            </div>
            <div className="mt-4 font-display text-2xl font-extrabold">{profile.name}</div>
            <div className="text-xs text-muted-foreground">{profile.email} · {profile.phone}</div>
            <div className="mt-2 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                <Award className="size-3" /> Gold Traveler
              </span>
              <span className="inline-flex items-center gap-1 rounded-full glass-panel px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest">
                <span>{country.flag}</span> {country.name}
              </span>
            </div>
          </div>


          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 stagger">
            {stats.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="rounded-2xl glass-panel p-3 flex flex-col items-center"
              >
                <Icon className="size-4 text-primary" />
                <div className="mt-1 font-display text-lg font-extrabold">{value}</div>
                <div className="text-[10px] text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>

          {/* Wallet card */}
          <div className="mt-5 rounded-3xl glass-strong p-4 flex items-center gap-4">
            <span className="grid size-12 place-items-center rounded-2xl gradient-primary shadow-glow">
              <Wallet className="size-5 text-primary-foreground" />
            </span>
            <div className="flex-1">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Velocity Wallet
              </div>
              <div className="font-display text-xl font-extrabold">{country.symbol}1,240</div>
            </div>
            <button className="text-xs font-bold text-primary">Top up</button>
          </div>

          {/* Rows */}
          <div className="mt-6 rounded-3xl border border-foreground/10 bg-surface divide-y divide-foreground/5">
            {rows.map((r) => (
              <Link
                key={r.label}
                to={r.to}
                className="flex items-center justify-between px-4 py-4 active:bg-foreground/5 transition-colors"
              >
                <span
                  className={
                    "text-sm font-medium " + (r.accent ? "text-primary" : "text-foreground/90")
                  }
                >
                  {r.label}
                </span>
                <ChevronRight className="size-4 text-muted-foreground" />
              </Link>
            ))}
          </div>

          <Link
            to="/signin"
            className="mt-6 flex h-12 items-center justify-center rounded-2xl border border-foreground/10 bg-foreground/5 font-semibold text-sm text-foreground/80 active:scale-95 transition-transform"
          >
            Sign out
          </Link>
        </div>

        <BottomNav />
        <SideDrawer open={drawer} onClose={() => setDrawer(false)} />
      </div>
    </MobileFrame>
  );
}
