import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { MobileFrame } from "@/components/mobile-frame";
import { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Check,
  User,
  Phone,
  ArrowRight,
  ArrowLeft,
  Bus,
  Globe,
  ChevronDown,
  Sparkles,
  X,
  Coffee,
} from "lucide-react";
import { COUNTRIES, writeProfile, countryOf } from "@/lib/user-store";

export const Route = createFileRoute("/signin")({
  head: () => ({ meta: [{ title: "Sign in · Velocity" }] }),
  component: SignIn,
});

type Mode = "signin" | "signup";

function SignIn() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("signin");
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(true);
  const [agree, setAgree] = useState(false);
  const [countryPickerOpen, setCountryPickerOpen] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [country, setCountry] = useState("PK");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const activeCountry = countryOf(country);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!agree) {
      setError("Please accept the Terms & Privacy Policy to continue.");
      return;
    }
    if (mode === "signin" && !name.trim()) {
      setError("Please enter your name to sign in.");
      return;
    }
    setError(null);
    if (mode === "signup") {
      writeProfile({
        name: name || "Traveler",
        email: email || "you@velocity.app",
        phone: phone || `${activeCountry.dial} `,
        country,
        city: "",
      });
      navigate({ to: "/onboarding" });
    } else {
      // Persist the signed-in identity so the app shows the correct name.
      writeProfile({
        name: name.trim(),
        ...(email ? { email } : {}),
      });
      navigate({ to: "/home" });
    }
  }

  return (
    <MobileFrame>
      <div className="relative h-full w-full gradient-dawn overflow-y-auto no-scrollbar">
        {/* decorative glow */}
        <div className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-primary/40 blur-3xl" />
        <div className="pointer-events-none absolute bottom-40 -left-24 size-72 rounded-full bg-fuchsia-500/25 blur-3xl" />

        {/* Compact brand row */}
        <div className="relative flex items-center justify-between px-6 pt-6">
          <button
            onClick={() => window.history.back()}
            aria-label="Back"
            className="grid size-10 place-items-center rounded-2xl glass-panel active:scale-95 transition"
          >
            <ArrowLeft className="size-5" />
          </button>
          <div className="inline-flex items-center gap-2 font-display font-black tracking-tight">
            <span className="grid size-8 place-items-center rounded-xl gradient-sunrise shadow-glow">
              <Bus className="size-4 text-primary-foreground" />
            </span>
            <span className="bg-clip-text text-transparent gradient-sunrise text-lg">
              VELOCITY
            </span>
          </div>
          <span className="w-10" />
        </div>

        <div className="relative px-6 pt-4 pb-10">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-1.5 rounded-full glass-panel px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
              <Sparkles className="size-3" />
              {mode === "signin" ? "Welcome home" : "Join the ride"}
            </div>
            <h1 className="mt-3 font-display text-[40px] font-black leading-[1.05] tracking-tight">
              {mode === "signin" ? (
                <>Hey,<br />
                <span className="bg-clip-text text-transparent gradient-sunrise">
                  welcome back
                </span></>
              ) : (
                <>Let's get<br />
                <span className="bg-clip-text text-transparent gradient-sunrise">
                  you on board
                </span></>
              )}
            </h1>
            <p className="mt-3 text-sm text-muted-foreground max-w-[36ch]">
              {mode === "signin"
                ? "Sign in to continue your journey with Velocity."
                : "Pick your country, tell us who you are — we'll surface the best routes near you."}
            </p>
          </div>

          {/* Segmented toggle */}
          <div className="mt-6 relative grid grid-cols-2 rounded-2xl glass-strong p-1 text-sm font-semibold">
            <span
              className={
                "absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-xl gradient-sunrise shadow-glow transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] " +
                (mode === "signup" ? "translate-x-[calc(100%+4px)]" : "translate-x-0")
              }
            />
            <button
              type="button"
              onClick={() => { setMode("signin"); setAgree(false); setError(null); }}
              className={
                "relative z-10 py-2.5 transition-colors " +
                (mode === "signin" ? "text-primary-foreground" : "text-muted-foreground")
              }
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => { setMode("signup"); setAgree(false); setError(null); }}
              className={
                "relative z-10 py-2.5 transition-colors " +
                (mode === "signup" ? "text-primary-foreground" : "text-muted-foreground")
              }
            >
              Create account
            </button>
          </div>

          <form
            key={mode}
            onSubmit={submit}
            className={
              "mt-6 space-y-3 " +
              (mode === "signin" ? "animate-slide-in-left" : "animate-slide-in-right")
            }
          >
            {mode === "signup" && (
              <>
                {/* Country selector */}
                <label className="block">
                  <span className="mb-1.5 ml-1 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Country / Region
                  </span>
                  <button
                    type="button"
                    onClick={() => setCountryPickerOpen((o) => !o)}
                    className="flex h-13 w-full items-center gap-3 rounded-2xl bg-surface border border-foreground/10 px-4 py-3 text-left shadow-soft active:scale-[0.99] transition"
                  >
                    <span className="grid size-8 place-items-center rounded-lg bg-primary/15 text-primary">
                      <Globe className="size-4" />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground block leading-none mb-0.5">
                        Booking country
                      </span>
                      <span className="text-sm font-semibold flex items-center gap-2">
                        <span className="text-lg leading-none">{activeCountry.flag}</span>
                        {activeCountry.name}
                        <span className="text-muted-foreground text-xs">
                          · {activeCountry.dial}
                        </span>
                      </span>
                    </span>
                    <ChevronDown
                      className={
                        "size-4 text-muted-foreground transition-transform " +
                        (countryPickerOpen ? "rotate-180" : "")
                      }
                    />
                  </button>
                  {countryPickerOpen && (
                    <div className="mt-2 grid grid-cols-1 gap-1 rounded-2xl bg-surface border border-foreground/10 p-2 shadow-elevated animate-fade-in">
                      {COUNTRIES.map((c) => {
                        const selected = c.code === country;
                        return (
                          <button
                            type="button"
                            key={c.code}
                            onClick={() => {
                              setCountry(c.code);
                              setCountryPickerOpen(false);
                            }}
                            className={
                              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition " +
                              (selected
                                ? "bg-primary/15 text-foreground"
                                : "hover:bg-foreground/5 text-foreground/85")
                            }
                          >
                            <span className="text-lg">{c.flag}</span>
                            <span className="flex-1 text-left font-semibold">{c.name}</span>
                            <span className="text-xs text-muted-foreground">{c.dial}</span>
                            {selected && (
                              <Check className="size-4 text-primary" strokeWidth={3} />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </label>

                <Field
                  icon={User}
                  label="Full name"
                  type="text"
                  placeholder="Aarav Rana"
                  value={name}
                  onChange={setName}
                />
                <Field
                  icon={Phone}
                  label="Phone"
                  type="tel"
                  placeholder={`${activeCountry.dial} 300 1234567`}
                  value={phone}
                  onChange={setPhone}
                />
              </>
            )}

            {mode === "signin" && (
              <Field
                icon={User}
                label="Your name"
                type="text"
                placeholder="e.g. Anas"
                value={name}
                onChange={setName}
              />
            )}

            <Field
              icon={Mail}
              label="Email"
              type="email"
              placeholder="you@velocity.app"
              autoComplete="email"
              value={email}
              onChange={setEmail}
            />

            <label className="block">
              <span className="mb-1.5 ml-1 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Password
              </span>
              <div className="flex h-13 items-center gap-3 rounded-2xl bg-surface border border-foreground/10 px-4 py-3 focus-within:ring-2 focus-within:ring-primary/50 transition-all shadow-soft">
                <Lock className="size-4 text-muted-foreground" />
                <input
                  type={showPwd ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete={mode === "signin" ? "current-password" : "new-password"}
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  aria-label={showPwd ? "Hide password" : "Show password"}
                  className="grid size-8 place-items-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition"
                >
                  {showPwd ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </label>

            {mode === "signin" && (
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => setRemember((r) => !r)}
                  className="flex items-center gap-2 text-sm text-foreground/85"
                >
                  <span
                    className={
                      "grid size-5 place-items-center rounded-md border transition-all " +
                      (remember
                        ? "gradient-sunrise border-transparent shadow-glow"
                        : "border-foreground/25 bg-foreground/5")
                    }
                  >
                    {remember && <Check className="size-3.5 text-primary-foreground" strokeWidth={3} />}
                  </span>
                  Remember me
                </button>
                <button
                  type="button"
                  onClick={() => setForgotOpen(true)}
                  className="text-sm font-semibold text-primary"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* T&C checkbox — required in BOTH modes */}
            <label className="mt-2 flex items-start gap-3 rounded-2xl glass-panel p-3 cursor-pointer">
              <button
                type="button"
                onClick={() => { setAgree((a) => !a); if (error) setError(null); }}
                aria-pressed={agree}
                className={
                  "mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border transition-all " +
                  (agree
                    ? "gradient-sunrise border-transparent shadow-glow"
                    : "border-foreground/30 bg-foreground/5")
                }
              >
                {agree && <Check className="size-3.5 text-primary-foreground" strokeWidth={3} />}
              </button>
              <span className="text-[11px] leading-relaxed text-foreground/80">
                I've read and agree to the{" "}
                <Link to="/terms" className="text-primary font-semibold underline underline-offset-2">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-primary font-semibold underline underline-offset-2">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>

            {error && (
              <div className="rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs font-semibold text-destructive animate-fade-in">
                {error}
              </div>
            )}

            <button
              type="submit"
              className={
                "btn-shimmer mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-2xl gradient-sunrise font-bold text-primary-foreground shadow-glow active:scale-[0.98] transition-transform " +
                (agree ? "" : "opacity-70")
              }
            >
              {mode === "signin" ? "Sign in" : "Create account"}
              <ArrowRight className="size-5" />
            </button>
          </form>

          {/* Socials — ONLY on sign in (removed on create account) */}
          {mode === "signin" && (
            <>
              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-foreground/10" />
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  or continue with
                </span>
                <div className="h-px flex-1 bg-foreground/10" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="h-12 rounded-2xl glass-strong text-sm font-semibold active:scale-95 transition-transform">
                   Apple
                </button>
                <button className="h-12 rounded-2xl glass-strong text-sm font-semibold active:scale-95 transition-transform">
                  G  Google
                </button>
              </div>
            </>
          )}
        </div>

        {forgotOpen && <ForgotModal onClose={() => setForgotOpen(false)} />}
      </div>
    </MobileFrame>
  );
}

function ForgotModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-50 flex items-end sm:items-center justify-center">
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
      />
      <div className="relative w-[92%] max-w-sm rounded-3xl glass-strong border border-foreground/10 p-6 shadow-elevated animate-entrance mb-6">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-foreground/5 hover:bg-foreground/10 transition"
        >
          <X className="size-4" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="relative grid size-20 place-items-center rounded-[28px] gradient-sunrise text-primary-foreground shadow-glow">
            <Coffee className="size-9 animate-bus-bob" />
            <span className="absolute -top-1 -right-1 text-2xl animate-glow-pulse">🧠</span>
          </div>
          <h3 className="mt-4 font-display text-2xl font-black leading-tight">
            Uh oh… brain buffering?
          </h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Don't worry — even our fastest buses forget where they parked
            sometimes. We'll send a shiny reset link to your email so you can
            get back on the road. ☕✨
          </p>

          <div className="mt-5 w-full space-y-2 text-left">
            <label className="block">
              <span className="mb-1.5 ml-1 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Email
              </span>
              <div className="flex h-12 items-center gap-3 rounded-2xl bg-surface border border-foreground/10 px-4">
                <Mail className="size-4 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="you@velocity.app"
                  className="flex-1 bg-transparent text-sm outline-none"
                />
              </div>
            </label>
          </div>

          <button
            onClick={onClose}
            className="btn-shimmer mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-2xl gradient-sunrise font-bold text-primary-foreground shadow-glow active:scale-[0.98] transition-transform"
          >
            Send me the magic link
            <Sparkles className="size-4" />
          </button>
          <p className="mt-3 text-[10px] text-muted-foreground italic">
            P.S. Try "password123" next time. Just kidding. Please don't.
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({
  icon: Icon,
  label,
  type,
  placeholder,
  autoComplete,
  value,
  onChange,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  type: string;
  placeholder: string;
  autoComplete?: string;
  value?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 ml-1 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <div className="flex h-13 items-center gap-3 rounded-2xl bg-surface border border-foreground/10 px-4 py-3 focus-within:ring-2 focus-within:ring-primary/50 transition-all shadow-soft">
        <Icon className="size-4 text-muted-foreground" />
        <input
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
        />
      </div>
    </label>
  );
}
