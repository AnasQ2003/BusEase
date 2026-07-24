import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame } from "@/components/mobile-frame";
import { useState } from "react";
import { MapPin, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [{ title: "Welcome to Velocity" }],
  }),
  component: Onboarding,
});

const slides = [
  {
    icon: MapPin,
    title: "Every route,\none tap away",
    body: "Search 10,000+ interstate routes with real-time seat availability.",
  },
  {
    icon: Sparkles,
    title: "Premium\nby default",
    body: "Sleeper coaches, AC recliners and live tracking on every ride.",
  },
  {
    icon: ShieldCheck,
    title: "Book with\nconfidence",
    body: "Secure payments, instant refunds and 24/7 travel support.",
  },
];

function Onboarding() {
  const [i, setI] = useState(0);
  const slide = slides[i];
  const Icon = slide.icon;
  const isLast = i === slides.length - 1;

  return (
    <MobileFrame>
      <div className="relative h-full w-full gradient-dawn overflow-hidden">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 size-80 rounded-full bg-primary/25 blur-3xl" />

        <div className="relative flex h-full flex-col px-8 pt-16 pb-10">
          <div className="flex justify-end">
            <Link to="/home" className="text-sm font-medium text-muted-foreground">
              Skip
            </Link>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div
              key={i}
              className="mb-10 grid size-32 place-items-center rounded-[2rem] glass-strong shadow-glow animate-entrance"
            >
              <Icon className="size-14 text-primary" strokeWidth={1.4} />
            </div>
            <h2
              key={"t" + i}
              className="font-display text-4xl font-extrabold leading-tight whitespace-pre-line animate-fade-up"
            >
              {slide.title}
            </h2>
            <p
              key={"b" + i}
              className="mt-4 text-muted-foreground max-w-[30ch] animate-fade-up"
            >
              {slide.body}
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 mb-8">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={
                  "h-1.5 rounded-full transition-all duration-500 " +
                  (idx === i ? "w-8 bg-primary" : "w-1.5 bg-foreground/20")
                }
              />
            ))}
          </div>

          {isLast ? (
            <Link
              to="/home"
              className="btn-shimmer flex h-14 items-center justify-center gap-2 rounded-2xl gradient-primary text-primary-foreground font-bold shadow-glow active:scale-[0.98] transition-transform"
            >
              Start exploring <ArrowRight className="size-5" />
            </Link>
          ) : (
            <button
              onClick={() => setI(i + 1)}
              className="btn-shimmer flex h-14 items-center justify-center gap-2 rounded-2xl gradient-primary text-primary-foreground font-bold shadow-glow active:scale-[0.98] transition-transform"
            >
              Next <ArrowRight className="size-5" />
            </button>
          )}
        </div>
      </div>
    </MobileFrame>
  );
}
