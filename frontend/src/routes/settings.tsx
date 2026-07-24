import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame } from "@/components/mobile-frame";
import { TopBar } from "@/components/top-bar";
import { BottomNav } from "@/components/bottom-nav";
import { useEffect, useState } from "react";
import {
  Bell,
  Sun,
  Fingerprint,
  Globe,
  MapPin,
  MessageSquare,
  ShieldCheck,
  FileText,
  Trash2,
  ChevronRight,
  Sparkles,
  X,
} from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings · Velocity" }] }),
  component: Settings,
});

const LIGHT_KEY = "velocity.lightMode";

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)}
      aria-pressed={on}
      className={
        "relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors " +
        (on ? "gradient-primary shadow-glow" : "bg-foreground/15")
      }
    >
      <span
        className={
          "inline-block size-5 rounded-full bg-white shadow-soft transition-transform duration-300 " +
          (on ? "translate-x-6" : "translate-x-1")
        }
      />
    </button>
  );
}

type RowProps = {
  icon: typeof Bell;
  label: string;
  sub?: string;
  action?: React.ReactNode;
  danger?: boolean;
  onClick?: () => void;
  to?: string;
};

function Row({ icon: Icon, label, sub, action, danger, onClick, to }: RowProps) {
  const inner = (
    <div className="flex items-center gap-4 px-4 py-3.5 w-full text-left">
      <span
        className={
          "grid size-10 shrink-0 place-items-center rounded-xl " +
          (danger ? "bg-destructive/15" : "bg-primary/10")
        }
      >
        <Icon className={"size-4 " + (danger ? "text-destructive" : "text-primary")} />
      </span>
      <div className="flex-1 min-w-0">
        <div className={"text-sm font-semibold " + (danger ? "text-destructive" : "text-foreground/90")}>
          {label}
        </div>
        {sub && <div className="text-[10px] text-muted-foreground truncate">{sub}</div>}
      </div>
      {action ?? <ChevronRight className="size-4 text-muted-foreground" />}
    </div>
  );
  if (to) return <Link to={to} className="block active:bg-foreground/5">{inner}</Link>;
  if (onClick || !action) return <button type="button" onClick={onClick} className="block w-full active:bg-foreground/5">{inner}</button>;
  return inner;
}

function Settings() {
  const [light, setLight] = useState(false);
  const [modal, setModal] = useState<{ title: string; body: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(LIGHT_KEY) === "1";
    setLight(stored);
    document.documentElement.classList.toggle("light", stored);
  }, []);

  function toggleLight(v: boolean) {
    setLight(v);
    localStorage.setItem(LIGHT_KEY, v ? "1" : "0");
    document.documentElement.classList.toggle("light", v);
  }

  const comingSoon = (label: string) =>
    setModal({
      title: `${label} · Coming soon`,
      body: "We're polishing this up right now. Hang tight — it'll roll out in the next Velocity update.",
    });

  return (
    <MobileFrame>
      <div className="relative min-h-full w-full bg-background flex flex-col">
        <TopBar showBack title="Settings" />

        <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-32 space-y-5 stagger">
          <section>
            <div className="mb-2 ml-1 text-[10px] uppercase tracking-widest text-muted-foreground">
              Preferences
            </div>
            <div className="rounded-3xl border border-foreground/10 bg-surface divide-y divide-foreground/5">
              <Row
                icon={Bell}
                label="Push notifications"
                sub="Bookings, offers, alerts"
                onClick={() => comingSoon("Push notifications")}
                action={<ChevronRight className="size-4 text-muted-foreground" />}
              />
              <Row
                icon={Sun}
                label="Light mode"
                sub={light ? "Rise and shine" : "Currently dark"}
                action={<Toggle on={light} onChange={toggleLight} />}
              />
              <Row
                icon={Globe}
                label="Language"
                sub="English (Global)"
                onClick={() => comingSoon("Language")}
              />
              <Row
                icon={MapPin}
                label="Location services"
                sub="Improve boarding suggestions"
                onClick={() => comingSoon("Location services")}
              />
            </div>
          </section>

          <section>
            <div className="mb-2 ml-1 text-[10px] uppercase tracking-widest text-muted-foreground">
              Security
            </div>
            <div className="rounded-3xl border border-foreground/10 bg-surface divide-y divide-foreground/5">
              <Row icon={Fingerprint} label="Biometric login" sub="Face ID / Touch ID" onClick={() => comingSoon("Biometric login")} />
              <Row icon={ShieldCheck} label="Change password" sub="Last updated 3 months ago" onClick={() => comingSoon("Change password")} />
              <Row icon={MessageSquare} label="SMS alerts" sub="For booking updates" onClick={() => comingSoon("SMS alerts")} />
            </div>
          </section>

          <section>
            <div className="mb-2 ml-1 text-[10px] uppercase tracking-widest text-muted-foreground">
              Legal
            </div>
            <div className="rounded-3xl border border-foreground/10 bg-surface divide-y divide-foreground/5">
              <Row icon={FileText} label="Terms of Service" to="/terms" />
              <Row icon={ShieldCheck} label="Privacy Policy" to="/privacy" />
              <Row icon={FileText} label="Refund Policy" onClick={() => comingSoon("Refund Policy")} />
            </div>
          </section>

          <section>
            <div className="rounded-3xl border border-destructive/20 bg-destructive/5">
              <Row icon={Trash2} label="Delete account" sub="This action cannot be undone" danger onClick={() => comingSoon("Delete account")} />
            </div>
          </section>

          <div className="pt-2 text-center text-[10px] text-muted-foreground">
            Velocity v3.1 · Dawn Momentum · Made with ♥
          </div>
        </div>

        <BottomNav />

        {modal && (
          <div className="absolute inset-0 z-40 grid place-items-center bg-black/60 backdrop-blur-sm animate-fade-in px-6">
            <div className="w-full max-w-sm rounded-3xl glass-strong border border-foreground/10 p-6 shadow-elevated animate-scale-in">
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-2xl gradient-sunrise shadow-glow">
                  <Sparkles className="size-5 text-primary-foreground" />
                </span>
                <button
                  onClick={() => setModal(null)}
                  aria-label="Close"
                  className="grid size-9 place-items-center rounded-full bg-foreground/5 hover:bg-foreground/10"
                >
                  <X className="size-4" />
                </button>
              </div>
              <div className="mt-4 font-display text-lg font-extrabold">{modal.title}</div>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{modal.body}</p>
              <button
                onClick={() => setModal(null)}
                className="mt-5 flex h-12 w-full items-center justify-center rounded-2xl gradient-sunrise font-bold text-primary-foreground shadow-glow active:scale-[0.98] transition-transform"
              >
                Got it
              </button>
            </div>
          </div>
        )}
      </div>
    </MobileFrame>
  );
}
