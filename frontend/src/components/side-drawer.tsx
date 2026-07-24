import { Link } from "@tanstack/react-router";
import {
  X,
  User,
  Ticket,
  Wallet,
  Settings,
  HelpCircle,
  Star,
  LogOut,
  Gift,
  MapPin,
  Shield,
  FileText,
  Bell,
  Moon,
  Bus,
} from "lucide-react";
import { useProfile, countryOf } from "@/lib/user-store";

const primary = [
  { to: "/profile", label: "My Profile", icon: User, hint: "Personal info" },
  { to: "/tickets", label: "My Trips", icon: Ticket, hint: "12 bookings" },
  { to: "/wallet", label: "Offers & Wallet", icon: Wallet, hint: "₹1,240 balance" },
  { to: "/refer", label: "Refer & Earn", icon: Gift, hint: "Get ₹200" },
  { to: "/live-track", label: "Live Bus Tracking", icon: MapPin, hint: "Track in real time" },
] as const;

const secondary = [
  { to: "/settings", label: "Settings", icon: Settings },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/settings", label: "Appearance", icon: Moon },
  { to: "/help", label: "Help Center", icon: HelpCircle },
  { to: "/terms", label: "Terms of Service", icon: FileText },
  { to: "/privacy", label: "Privacy Policy", icon: Shield },
  { to: "/offers", label: "Rate Velocity", icon: Star },
] as const;

export function SideDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const profile = useProfile();
  const country = countryOf(profile.country);
  return (
    <div
      className={
        "absolute inset-0 z-50 " + (open ? "pointer-events-auto" : "pointer-events-none")
      }
      aria-hidden={!open}
    >
      <button
        onClick={onClose}
        tabIndex={open ? 0 : -1}
        aria-label="Close menu"
        className={
          "absolute inset-0 bg-foreground/40 backdrop-blur-sm transition-opacity duration-300 " +
          (open ? "opacity-100" : "opacity-0")
        }
      />

      <aside
        className={
          "absolute left-0 top-0 h-full w-[86%] max-w-[340px] bg-background border-r border-foreground/10 " +
          "flex flex-col overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] " +
          (open ? "translate-x-0" : "-translate-x-full")
        }
      >
        {/* Header banner */}
        <div className="relative gradient-sunrise text-primary-foreground p-5 pt-8 pb-6 overflow-hidden">
          <div className="absolute -top-16 -right-16 size-48 rounded-full bg-primary-foreground/10 blur-2xl" />
          <div className="absolute -bottom-10 -left-10 size-32 rounded-full bg-primary-foreground/15 blur-2xl" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-2 font-display text-xl font-black tracking-tight">
              <span className="grid size-8 place-items-center rounded-xl bg-primary-foreground/20 backdrop-blur">
                <Bus className="size-4" />
              </span>
              VELOCITY
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="grid size-9 place-items-center rounded-full bg-primary-foreground/15 hover:bg-primary-foreground/25 active:scale-95 transition"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Profile chip */}
          <Link
            to="/profile"
            onClick={onClose}
            className="relative mt-5 flex items-center gap-3 rounded-2xl bg-primary-foreground/15 backdrop-blur-md p-3 active:scale-[0.98] transition"
          >
            <div className="grid size-12 place-items-center rounded-xl bg-primary-foreground text-primary font-display font-black text-base shadow-soft">
              {profile.avatarEmoji ? <span className="text-2xl leading-none">{profile.avatarEmoji}</span> : profile.avatarInitials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-bold truncate">{profile.name}</div>
              <div className="text-[11px] opacity-90 truncate">Gold Traveler · {country.flag} {country.name}</div>
            </div>
            <div className="rounded-full bg-primary-foreground/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest">
              Pro
            </div>
          </Link>

          {/* Mini stats */}
          <div className="relative mt-3 grid grid-cols-3 gap-2 text-center">
            {[
              { v: "12", l: "Trips" },
              { v: "₹1.2k", l: "Wallet" },
              { v: "8", l: "Cities" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl bg-primary-foreground/15 py-2">
                <div className="font-display font-black text-sm">{s.v}</div>
                <div className="text-[9px] uppercase tracking-widest opacity-90">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scrollable menu */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-3 py-4">
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-3 mb-2">
            Quick access
          </div>
          <ul className="space-y-1">
            {primary.map(({ to, label, icon: Icon, hint }) => (
              <li key={label}>
                <Link
                  to={to}
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-2xl px-3 py-2.5 hover:bg-foreground/5 active:scale-[0.99] transition"
                >
                  <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-4" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold">{label}</div>
                    <div className="text-[10px] text-muted-foreground">{hint}</div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-3 mt-5 mb-2">
            More
          </div>
          <ul className="space-y-0.5">
            {secondary.map(({ to, label, icon: Icon }) => (
              <li key={label}>
                <Link
                  to={to}
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground/80 hover:bg-foreground/5 transition"
                >
                  <Icon className="size-4 text-muted-foreground" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-foreground/10">
          <Link
            to="/signin"
            onClick={onClose}
            className="flex items-center justify-center gap-2 h-12 rounded-2xl bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 text-sm font-semibold text-foreground/80 active:scale-95 transition"
          >
            <LogOut className="size-4" />
            Sign out
          </Link>
          <p className="mt-3 text-center text-[10px] text-muted-foreground">
            Velocity v3.0 · Dawn Momentum
          </p>
        </div>
      </aside>
    </div>
  );
}
