import { createFileRoute } from "@tanstack/react-router";
import { MobileFrame } from "@/components/mobile-frame";
import { TopBar } from "@/components/top-bar";
import { BottomNav } from "@/components/bottom-nav";
import { SideDrawer } from "@/components/side-drawer";
import { useState } from "react";
import { Copy, Gift, Tag } from "lucide-react";

export const Route = createFileRoute("/offers")({
  head: () => ({ meta: [{ title: "Offers · Velocity" }] }),
  component: Offers,
});

const offers = [
  { code: "DAWN10", title: "Flat 10% off", sub: "On sleeper coaches this weekend", tint: "from-primary to-orange-500" },
  { code: "FIRST200", title: "₹200 off first ride", sub: "New users only", tint: "from-purple-500 to-primary" },
  { code: "GOLD25", title: "25% off Gold members", sub: "Auto-applied at checkout", tint: "from-emerald-500 to-primary" },
  { code: "HILL15", title: "15% off hill routes", sub: "Manali, Shimla, Kullu", tint: "from-sky-500 to-primary" },
];

function Offers() {
  const [drawer, setDrawer] = useState(false);
  return (
    <MobileFrame>
      <div className="relative h-full w-full overflow-hidden bg-background">
        <TopBar title="Offers" onMenu={() => setDrawer(true)} />

        <div className="h-[calc(100%-64px-80px)] overflow-y-auto no-scrollbar px-5 pb-6">
          {/* Hero coupon */}
          <div className="perspective-1000 relative rounded-3xl overflow-hidden p-5 gradient-primary text-primary-foreground shadow-glow animate-fade-up">
            <div className="absolute -top-8 -right-8 size-40 rounded-full bg-foreground/20 blur-2xl" />
            <div className="relative">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-black/25 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest">
                <Gift className="size-3" /> Festive
              </div>
              <div className="mt-3 font-display text-3xl font-extrabold leading-tight">
                Flat 30%<br />off Dawn ride
              </div>
              <div className="mt-1 text-xs opacity-90">Valid till 31 Oct on all sleepers</div>
              <div className="mt-4 flex items-center gap-2 rounded-2xl bg-black/25 px-3 py-2 w-fit">
                <span className="font-mono text-sm font-bold tracking-widest">FESTIVE30</span>
                <Copy className="size-4" />
              </div>
            </div>
          </div>

          <div className="mt-6 mb-3 text-[10px] uppercase tracking-widest text-muted-foreground">
            All coupons
          </div>

          <div className="space-y-3 stagger">
            {offers.map((o) => (
              <div
                key={o.code}
                className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-surface p-4 active:scale-[0.99] transition-transform"
              >
                <div
                  className={
                    "absolute -top-10 -left-10 size-32 rounded-full opacity-30 blur-2xl bg-gradient-to-br " +
                    o.tint
                  }
                />
                <div className="relative flex items-center gap-4">
                  <span className="grid size-12 place-items-center rounded-2xl bg-primary/15">
                    <Tag className="size-5 text-primary" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-bold">{o.title}</div>
                    <div className="text-[11px] text-muted-foreground truncate">{o.sub}</div>
                  </div>
                  <div className="flex items-center gap-1 rounded-lg border border-dashed border-primary/50 px-2 py-1 text-[10px] font-mono font-bold text-primary">
                    {o.code}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <BottomNav />
        <SideDrawer open={drawer} onClose={() => setDrawer(false)} />
      </div>
    </MobileFrame>
  );
}
