import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame } from "@/components/mobile-frame";
import { TopBar } from "@/components/top-bar";
import { BottomNav } from "@/components/bottom-nav";
import { Bell, Ticket, Tag, MapPin, Wallet, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifications · Velocity" }] }),
  component: Notifications,
});

type Notif = {
  id: string;
  icon: typeof Bell;
  title: string;
  body: string;
  time: string;
  to: string;
  search?: Record<string, string>;
  accent?: boolean;
  read?: boolean;
};

const initial: Notif[] = [
  {
    id: "n1",
    icon: Ticket,
    title: "Trip confirmed",
    body: "Your seat A-12 on Velocity Premium is booked for Fri, 12 Oct.",
    time: "2m ago",
    to: "/ticket",
    search: { status: "upcoming", from: "Delhi", to: "Manali", date: "Fri, 12 Oct · 21:30", pnr: "VH-29384-LX10", price: "₹3,515" },
    accent: true,
  },
  {
    id: "n2",
    icon: Wallet,
    title: "Wallet top-up",
    body: "₨1,000 has been added to your Velocity wallet.",
    time: "1h ago",
    to: "/offers",
  },
  {
    id: "n3",
    icon: Tag,
    title: "Weekend flash offer",
    body: "Save 20% on all overnight sleepers this weekend. Code: DAWN20",
    time: "5h ago",
    to: "/offers",
  },
  {
    id: "n4",
    icon: MapPin,
    title: "Boarding reminder",
    body: "Boarding starts at 21:00 tomorrow · Karachi Central Terminal.",
    time: "Yesterday",
    to: "/ticket",
    search: { status: "upcoming", from: "Delhi", to: "Manali", date: "Fri, 12 Oct · 21:30", pnr: "VH-29384-LX10", price: "₹3,515" },
    read: true,
  },
  {
    id: "n5",
    icon: CheckCircle2,
    title: "Refund processed",
    body: "Refund for booking VH-77812-JU08 credited to your wallet.",
    time: "2d ago",
    to: "/ticket",
    search: { status: "cancelled", from: "Jaipur", to: "Udaipur", date: "Thu, 8 Jun · 08:00", pnr: "VH-77812-JU08", price: "₹1,100" },
    read: true,
  },
];

function Notifications() {
  const [items, setItems] = useState<Notif[]>(initial);
  const unread = items.filter((n) => !n.read).length;

  function markRead(id: string) {
    setItems((arr) => arr.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }
  function markAllRead() {
    setItems((arr) => arr.map((n) => ({ ...n, read: true })));
  }

  return (
    <MobileFrame>
      <div className="relative h-full w-full overflow-hidden bg-background">
        <div
          className="absolute inset-x-0 top-0 h-40 pointer-events-none"
          style={{ background: "radial-gradient(80% 60% at 50% 0%, rgba(255,120,50,0.28) 0%, transparent 70%)" }}
        />
        <TopBar showBack title="Notifications" subtitle={unread ? `${unread} unread` : "You're all caught up"} />

        <div className="relative h-[calc(100%-64px-80px)] overflow-y-auto no-scrollbar px-5 pb-6 space-y-3 stagger">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Recent</span>
            <button
              onClick={markAllRead}
              disabled={unread === 0}
              className="text-[10px] font-bold uppercase tracking-widest text-primary disabled:opacity-40"
            >
              Mark all read
            </button>
          </div>

          {items.map((n) => {
            const Icon = n.icon;
            return (
              <Link
                key={n.id}
                to={n.to}
                search={n.search as never}
                onClick={() => markRead(n.id)}
                className={
                  "relative rounded-3xl p-4 flex gap-3 transition-all active:scale-[0.99] " +
                  (n.read
                    ? "bg-surface/40 border border-foreground/5 opacity-75"
                    : "glass-panel border border-primary/25 shadow-soft")
                }
              >
                {!n.read && (
                  <span className="absolute right-3 top-3 size-2 rounded-full bg-primary animate-glow-pulse" />
                )}
                <span
                  className={
                    "grid size-11 shrink-0 place-items-center rounded-2xl " +
                    (n.accent && !n.read
                      ? "gradient-sunrise text-primary-foreground shadow-glow"
                      : n.read
                      ? "bg-foreground/5 text-muted-foreground"
                      : "bg-primary/10 text-primary")
                  }
                >
                  <Icon className="size-5" />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className={"font-display text-sm truncate " + (n.read ? "font-semibold text-foreground/70" : "font-bold")}>{n.title}</div>
                    <span className="text-[10px] text-muted-foreground shrink-0 pr-3">{n.time}</span>
                  </div>
                  <p className={"mt-1 text-xs leading-relaxed " + (n.read ? "text-muted-foreground/70" : "text-muted-foreground")}>
                    {n.body}
                  </p>
                </div>
              </Link>
            );
          })}

          <div className="pt-4 text-center">
            <span className="inline-flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <Bell className="size-3" /> That's all for now
            </span>
          </div>
        </div>

        <BottomNav />
      </div>
    </MobileFrame>
  );
}
