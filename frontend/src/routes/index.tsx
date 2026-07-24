import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MobileFrame } from "@/components/mobile-frame";
import heroBus from "@/assets/hero-bus.png";
import { useEffect, useState } from "react";
import { Bus, MapPin, ShieldCheck, Zap } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Velocity — Book Premium Bus Tickets" },
      {
        name: "description",
        content:
          "Velocity: premium interstate bus booking with live seat maps, instant e-tickets and transparent pricing.",
      },
    ],
  }),
  component: SplashScreen,
});

const steps = [
  { label: "Warming up the engines", icon: Zap },
  { label: "Mapping the highways", icon: MapPin },
  { label: "Locking in the best fares", icon: Bus },
  { label: "Fastening seat belts", icon: ShieldCheck },
];

function SplashScreen() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const total = 3600;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / total);
      setProgress(p);
      setStepIdx(Math.min(steps.length - 1, Math.floor(p * steps.length)));
      if (p < 1) raf = requestAnimationFrame(tick);
      else navigate({ to: "/signin" });
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [navigate]);

  const pct = Math.round(progress * 100);
  const StepIcon = steps[stepIdx].icon;

  return (
    <MobileFrame>
      <div className="relative h-full w-full overflow-hidden gradient-dawn">
        {/* Colorful ambient blobs */}
        <div className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-primary/35 blur-3xl animate-glow-pulse" />
        <div className="pointer-events-none absolute bottom-40 -left-24 size-72 rounded-full bg-fuchsia-500/35 blur-3xl" />
        <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 size-56 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 right-4 size-40 rounded-full bg-amber-400/25 blur-3xl" />

        {/* Aurora ribbons */}
        <div
          className="pointer-events-none absolute inset-x-0 top-24 h-40 opacity-60"
          style={{
            background:
              "conic-gradient(from 210deg at 50% 50%, transparent 0deg, oklch(0.72 0.20 40 / 0.35) 60deg, oklch(0.68 0.24 340 / 0.35) 120deg, transparent 180deg)",
            filter: "blur(28px)",
          }}
        />

        {/* Stars */}
        <div className="pointer-events-none absolute inset-0 opacity-80">
          {Array.from({ length: 42 }).map((_, i) => {
            const palette = ["bg-primary", "bg-fuchsia-400", "bg-cyan-300", "bg-amber-300", "bg-foreground/70"];
            return (
              <span
                key={i}
                className={"absolute rounded-full animate-glow-pulse " + palette[i % palette.length]}
                style={{
                  width: (i % 4 === 0 ? 3 : 2) + "px",
                  height: (i % 4 === 0 ? 3 : 2) + "px",
                  top: `${(i * 37) % 62}%`,
                  left: `${(i * 53) % 100}%`,
                  animationDelay: `${(i % 8) * 0.3}s`,
                }}
              />
            );
          })}
        </div>

        <div className="relative flex h-full flex-col items-center justify-between px-8 pt-14 pb-10">
          {/* Wordmark */}
          <div className="text-center animate-fade-in">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full glass-panel px-3 py-1 text-[10px] font-semibold tracking-widest uppercase text-foreground/80">
              <span className="size-1.5 rounded-full bg-primary animate-glow-pulse" />
              Dawn Momentum · v3.1
            </div>
            <h1 className="mt-4 font-display text-6xl font-black tracking-tight bg-clip-text text-transparent gradient-sunrise drop-shadow-[0_6px_30px_rgba(255,120,50,0.35)]">
              VELOCITY
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Premium interstate travel · always on schedule
            </p>
          </div>

          {/* Highway stage */}
          <div className="relative w-full flex-1 flex flex-col items-center justify-end pb-2">
            {/* Sun / aurora glow behind mountains */}
            <div className="relative h-32 w-full overflow-hidden rounded-t-3xl">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(60% 100% at 70% 100%, oklch(0.72 0.20 40 / 0.55) 0%, oklch(0.55 0.20 350 / 0.35) 45%, transparent 75%)",
                }}
              />
              <div className="absolute right-10 bottom-6 size-16 rounded-full gradient-sunrise blur-[2px] shadow-glow" />

              {/* Far mountains — slow parallax, opposite to bus travel */}
              <div className="absolute inset-y-0 flex w-[200%] animate-scenery-slow" style={{ animationDirection: "reverse" }}>
                {[0, 1].map((k) => (
                  <svg key={k} viewBox="0 0 400 128" preserveAspectRatio="none" className="h-full w-1/2 shrink-0">
                    <defs>
                      <linearGradient id={`mFar${k}`} x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0" stopColor="oklch(0.45 0.10 300)" />
                        <stop offset="1" stopColor="oklch(0.22 0.06 280)" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,128 L0,80 L50,50 L110,72 L170,35 L230,68 L290,42 L350,70 L400,55 L400,128 Z"
                      fill={`url(#mFar${k})`}
                      opacity="0.85"
                    />
                  </svg>
                ))}
              </div>

              {/* Near mountains — faster parallax, opposite direction */}
              <div className="absolute inset-y-0 flex w-[200%] animate-scenery" style={{ animationDirection: "reverse" }}>
                {[0, 1].map((k) => (
                  <svg key={k} viewBox="0 0 400 128" preserveAspectRatio="none" className="h-full w-1/2 shrink-0">
                    <defs>
                      <linearGradient id={`mNear${k}`} x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0" stopColor="oklch(0.30 0.06 280)" />
                        <stop offset="1" stopColor="oklch(0.14 0.03 265)" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,128 L0,100 L70,70 L130,95 L200,60 L270,90 L340,65 L400,90 L400,128 Z"
                      fill={`url(#mNear${k})`}
                    />
                  </svg>
                ))}
              </div>
            </div>

            {/* Bus with subtle bob, riding the road below */}
            <div className="relative -mt-6 w-[78%]">
              {/* Speed streaks trailing the bus (opposite direction it's facing) */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-1/2 overflow-hidden">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="absolute h-[2px] rounded-full bg-primary/50 animate-streak"
                    style={{ top: `${30 + i * 18}%`, width: `${40 + i * 20}%`, animationDelay: `${i * 0.25}s` }}
                  />
                ))}
              </div>
              <img
                src={heroBus}
                alt="Luxury bus"
                width={1024}
                height={1024}
                className="relative z-10 w-full drop-shadow-[0_28px_60px_rgba(255,120,40,0.65)] animate-bus-bob"
              />
              <div className="mx-auto -mt-2 h-3 w-2/3 rounded-[50%] bg-black/60 blur-md" />
            </div>
          </div>

          {/* Loading — road IS the progress bar */}
          <div className="w-full space-y-3 animate-fade-up">
            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
              <span className="inline-flex items-center gap-2 uppercase tracking-widest">
                <span className="grid size-6 place-items-center rounded-lg bg-primary/15">
                  <StepIcon className="size-3.5 text-primary" />
                </span>
                {steps[stepIdx].label}
              </span>
              <span className="tabular-nums font-bold text-foreground">{pct}%</span>
            </div>

            {/* Road-shaped progress bar */}
            <div className="relative h-12 w-full">
              {/* Asphalt */}
              <div className="absolute inset-x-0 top-1.5 h-8 rounded-2xl bg-[oklch(0.14_0.02_265)] border border-foreground/10 shadow-elevated overflow-hidden">
                {/* Sunrise progress fill */}
                <div
                  className="absolute inset-y-0 left-0 gradient-sunrise shadow-glow transition-[width] duration-100"
                  style={{ width: `${pct}%` }}
                />
                {/* Shine sweep */}
                <div
                  className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  style={{ transform: `translateX(${pct * 3}px)` }}
                />
                {/* Dashed lane markings */}
                <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 h-[3px] road-lane animate-road-dash opacity-90" />
                {/* Road edges */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-foreground/25" />
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-foreground/20" />
              </div>

              {/* Bus icon riding the road */}
              <div
                className="absolute top-0 transition-[left] duration-100"
                style={{ left: `calc(${pct}% - 18px)` }}
              >
                <div className="grid size-9 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-glow border-2 border-background">
                  <Bus className="size-4" strokeWidth={2.5} />
                </div>
              </div>
            </div>

            {/* Step dots */}
            <div className="flex justify-between px-1 pt-1">
              {steps.map((s, i) => (
                <div key={s.label} className="flex flex-col items-center gap-1">
                  <span
                    className={
                      "size-1.5 rounded-full transition-all " +
                      (i <= stepIdx ? "bg-primary shadow-glow" : "bg-foreground/20")
                    }
                  />
                </div>
              ))}
            </div>
            <p className="text-center text-[10px] text-muted-foreground pt-1">
              Powered by dawn energy · Est. 2024
            </p>
          </div>
        </div>
      </div>
    </MobileFrame>
  );
}
