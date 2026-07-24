import { createFileRoute } from "@tanstack/react-router";
import { MobileFrame } from "@/components/mobile-frame";
import { TopBar } from "@/components/top-bar";
import { BottomNav } from "@/components/bottom-nav";
import { Copy, Gift, Share2, Users, Check, Sparkles } from "lucide-react";
import { useState } from "react";
import { useProfile, formatMoney } from "@/lib/user-store";

export const Route = createFileRoute("/refer")({
  head: () => ({
    meta: [
      { title: "Refer & Earn · Velocity" },
      { name: "description", content: "Invite friends to Velocity and earn wallet cashback on every ride." },
    ],
  }),
  component: ReferPage,
});

function ReferPage() {
  const profile = useProfile();
  const code = "VEL-" + (profile.avatarInitials || "YOU") + "-24";
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* noop */
    }
  }

  const friends = [
    { name: "Ahmed R.", status: "Joined", reward: 200 },
    { name: "Priya S.", status: "Rode 1st trip", reward: 200 },
    { name: "Bilal K.", status: "Invited", reward: 0 },
  ];

  return (
    <MobileFrame>
      <div className="relative min-h-full w-full bg-background flex flex-col">
        <TopBar showBack title="Refer & Earn" />

        <div className="relative flex-1 overflow-y-auto no-scrollbar px-5 pb-32">
          {/* Hero */}
          <div className="relative overflow-hidden rounded-3xl gradient-primary text-primary-foreground p-6 shadow-glow animate-fade-up">
            <div className="absolute -top-12 -right-10 size-40 rounded-full bg-white/25 blur-2xl" />
            <div className="absolute -bottom-16 -left-10 size-52 rounded-full bg-fuchsia-500/40 blur-3xl" />
            <div className="relative flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-black/25 rounded-full px-2.5 py-1 w-fit">
              <Sparkles className="size-3" /> Friends ride free-er
            </div>
            <div className="relative mt-3 font-display text-3xl font-black leading-tight">
              Give ₹200, <br /> Get ₹200
            </div>
            <div className="relative mt-2 text-xs opacity-90 max-w-[80%]">
              Share your code — your friend gets ₹200 off their first ride, and you get ₹200 in your wallet as soon as they travel.
            </div>
          </div>

          {/* Code card */}
          <div className="mt-5 rounded-3xl glass-strong p-5 text-center">
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Your unique code
            </div>
            <div className="mt-2 font-display text-2xl font-black tracking-widest">
              {code}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                onClick={copy}
                className="h-12 rounded-2xl bg-foreground/5 border border-foreground/10 font-bold text-sm active:scale-95 transition flex items-center justify-center gap-2"
              >
                {copied ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
                {copied ? "Copied" : "Copy code"}
              </button>
              <button className="h-12 rounded-2xl gradient-primary text-primary-foreground font-bold text-sm shadow-glow active:scale-95 transition flex items-center justify-center gap-2">
                <Share2 className="size-4" />
                Share
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              { l: "Invited", v: "8", icon: Users },
              { l: "Riding", v: "3", icon: Gift },
              { l: "Earned", v: formatMoney(600, profile.country), icon: Sparkles },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl glass-panel p-3 text-center">
                <span className="grid size-9 mx-auto place-items-center rounded-xl bg-primary/15 text-primary">
                  <s.icon className="size-4" />
                </span>
                <div className="mt-2 font-display font-black text-sm">{s.v}</div>
                <div className="text-[9px] uppercase tracking-widest text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>

          {/* Friends list */}
          <div className="mt-6">
            <h3 className="font-display text-lg font-bold mb-3">Your invites</h3>
            <div className="rounded-3xl glass-panel divide-y divide-foreground/5">
              {friends.map((f) => (
                <div key={f.name} className="flex items-center gap-3 px-4 py-3">
                  <div className="grid size-10 place-items-center rounded-full gradient-primary text-primary-foreground text-xs font-black">
                    {f.name.slice(0, 1)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate">{f.name}</div>
                    <div className="text-[10px] text-muted-foreground">{f.status}</div>
                  </div>
                  <div className={"text-xs font-bold " + (f.reward ? "text-emerald-500" : "text-muted-foreground")}>
                    {f.reward ? "+" + formatMoney(f.reward, profile.country) : "Pending"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <BottomNav />
      </div>
    </MobileFrame>
  );
}
