import { createFileRoute } from "@tanstack/react-router";
import { MobileFrame } from "@/components/mobile-frame";
import { TopBar } from "@/components/top-bar";
import { BottomNav } from "@/components/bottom-nav";
import { Bus, MapPin, Navigation, Signal, Clock, Gauge, Phone, User } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/live-track")({
  head: () => ({
    meta: [
      { title: "Live tracking · Velocity" },
      { name: "description", content: "Real-time GPS tracking for your Velocity coach with ETA and driver contact." },
    ],
  }),
  component: LiveTrack,
});

const stops = [
  { name: "Karachi Cantt", time: "20:00", done: true },
  { name: "Hyderabad Bypass", time: "22:45", done: true },
  { name: "Sukkur Terminal", time: "02:10", done: true, current: false },
  { name: "Rahim Yar Khan", time: "05:20", done: false, current: true },
  { name: "Multan Metro", time: "08:40", done: false },
  { name: "Sahiwal Stop", time: "10:15", done: false },
  { name: "Lahore Daewoo", time: "12:30", done: false },
];

function LiveTrack() {
  const [pct, setPct] = useState(48);
  useEffect(() => {
    const id = setInterval(() => setPct((p) => (p >= 62 ? 48 : p + 0.6)), 220);
    return () => clearInterval(id);
  }, []);

  return (
    <MobileFrame>
      <div className="relative h-full w-full overflow-hidden bg-background">
        <TopBar showBack title="Live tracking" subtitle="Karachi → Lahore · VH-55440" />

        <div className="relative h-[calc(100%-64px-80px)] overflow-y-auto no-scrollbar px-5 pb-6">
          {/* Map illustration */}
          <div className="relative h-56 overflow-hidden rounded-3xl border border-foreground/10 shadow-elevated animate-fade-up">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(120% 80% at 20% 0%, oklch(0.28 0.09 265) 0%, oklch(0.14 0.03 265) 60%, oklch(0.10 0.02 265) 100%)",
              }}
            />
            {/* grid */}
            <svg viewBox="0 0 400 220" className="absolute inset-0 h-full w-full opacity-40">
              <defs>
                <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
                  <path d="M 24 0 L 0 0 0 24" fill="none" stroke="oklch(0.55 0.03 265)" strokeWidth="0.4" />
                </pattern>
              </defs>
              <rect width="400" height="220" fill="url(#grid)" />
            </svg>

            {/* route path */}
            <svg viewBox="0 0 400 220" className="absolute inset-0 h-full w-full">
              <path
                d="M 20 180 C 90 160, 100 90, 180 90 S 300 150, 380 40"
                fill="none"
                stroke="oklch(0.72 0.20 40)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="0 0"
              />
              <path
                d="M 20 180 C 90 160, 100 90, 180 90 S 300 150, 380 40"
                fill="none"
                stroke="url(#glow)"
                strokeWidth="10"
                strokeLinecap="round"
                opacity="0.35"
              />
              <defs>
                <linearGradient id="glow" x1="0" x2="1">
                  <stop offset="0" stopColor="oklch(0.72 0.20 40)" />
                  <stop offset="1" stopColor="oklch(0.68 0.24 340)" />
                </linearGradient>
              </defs>
              {/* Start / end pins */}
              <circle cx="20" cy="180" r="6" fill="oklch(0.72 0.20 40)" />
              <circle cx="380" cy="40" r="6" fill="oklch(0.68 0.24 340)" />
            </svg>

            {/* Bus marker */}
            <div
              className="absolute top-[38%] transition-[left] duration-500 ease-linear"
              style={{ left: `calc(${pct}% - 16px)` }}
            >
              <span className="relative grid size-10 place-items-center rounded-full gradient-primary text-primary-foreground shadow-glow border-2 border-background">
                <Bus className="size-4" strokeWidth={2.5} />
                <span className="absolute inset-0 rounded-full bg-primary/40 animate-ripple" />
              </span>
            </div>

            <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-emerald-500/20 text-emerald-400 px-2 py-1 text-[10px] font-bold uppercase tracking-widest">
              <Signal className="size-3" /> Live
            </div>
            <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/40 text-white/90 px-2 py-1 text-[10px] font-semibold">
              <Navigation className="size-3" /> N-5 Highway
            </div>
          </div>

          {/* Stats */}
          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              { l: "ETA", v: "5h 22m", icon: Clock, tint: "text-primary" },
              { l: "Speed", v: "84 km/h", icon: Gauge, tint: "text-emerald-500" },
              { l: "Next stop", v: "RYK", icon: MapPin, tint: "text-fuchsia-400" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl glass-panel p-3">
                <span className={"grid size-9 place-items-center rounded-xl bg-foreground/5 " + s.tint}>
                  <s.icon className="size-4" />
                </span>
                <div className="mt-2 font-display font-black text-sm">{s.v}</div>
                <div className="text-[9px] uppercase tracking-widest text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>

          {/* Driver */}
          <div className="mt-5 rounded-3xl glass-strong p-4 flex items-center gap-3">
            <div className="grid size-12 place-items-center rounded-2xl gradient-primary text-primary-foreground">
              <User className="size-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold">Kaptaan Imran · Driver</div>
              <div className="text-[11px] text-muted-foreground">Coach VL-4290 · 4.9★ · 12 yrs exp</div>
            </div>
            <a
              href="tel:+923001234567"
              className="grid size-10 place-items-center rounded-2xl bg-emerald-500/15 text-emerald-500 active:scale-95 transition"
            >
              <Phone className="size-4" />
            </a>
          </div>

          {/* Timeline */}
          <div className="mt-6">
            <h3 className="font-display text-lg font-bold mb-3">Journey timeline</h3>
            <ol className="relative pl-6">
              <span className="absolute left-2 top-2 bottom-2 w-px bg-foreground/15" />
              {stops.map((s, i) => (
                <li key={s.name} className="relative pb-4 last:pb-0">
                  <span
                    className={
                      "absolute -left-[18px] top-1 grid size-4 place-items-center rounded-full border-2 border-background " +
                      (s.current
                        ? "bg-primary shadow-glow animate-glow-pulse"
                        : s.done
                        ? "bg-emerald-500"
                        : "bg-foreground/25")
                    }
                  />
                  <div className="flex items-center justify-between">
                    <div
                      className={
                        "text-sm font-semibold " +
                        (s.current ? "text-primary" : s.done ? "text-foreground/80" : "text-foreground")
                      }
                    >
                      {s.name} {s.current && <span className="ml-2 text-[10px] font-bold uppercase tracking-widest text-primary">Approaching</span>}
                    </div>
                    <div className="text-[11px] text-muted-foreground tabular-nums">{s.time}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <BottomNav />
      </div>
    </MobileFrame>
  );
}
