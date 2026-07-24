import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Ticket, Tag, User, Search } from "lucide-react";

const items = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/tickets", label: "Trips", icon: Ticket },
  { to: "/offers", label: "Offers", icon: Tag },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      aria-label="Primary"
      className="absolute inset-x-0 bottom-0 z-30 pointer-events-none pb-[max(env(safe-area-inset-bottom),0.5rem)]"
    >
      <div className="pointer-events-auto relative mx-4 mb-2 rounded-[28px] glass-strong shadow-elevated px-2 py-2">
        <ul className="grid grid-cols-5 items-center">
          {items.slice(0, 2).map(({ to, label, icon: Icon }) => (
            <NavItem key={to} to={to} label={label} Icon={Icon} active={pathname === to} />
          ))}

          {/* Center floating search */}
          <li className="flex justify-center">
            <Link
              to="/search"
              aria-label="Search"
              className="relative -mt-8 grid size-16 place-items-center rounded-full gradient-sunrise text-primary-foreground shadow-glow active:scale-95 transition"
            >
              <span className="absolute inset-0 rounded-full bg-primary/30 blur-lg animate-glow-pulse" />
              <Search className="relative size-6" strokeWidth={2.5} />
            </Link>
          </li>

          {items.slice(2).map(({ to, label, icon: Icon }) => (
            <NavItem key={to} to={to} label={label} Icon={Icon} active={pathname === to} />
          ))}
        </ul>
      </div>
    </nav>
  );
}

function NavItem({
  to,
  label,
  Icon,
  active,
}: {
  to: string;
  label: string;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  active: boolean;
}) {
  return (
    <li className="flex">
      <Link
        to={to}
        className="group relative mx-auto flex flex-col items-center gap-0.5 rounded-2xl px-3 py-1.5"
      >
        <span
          className={
            "grid place-items-center size-9 rounded-xl transition-all duration-300 " +
            (active
              ? "bg-primary/15 scale-105"
              : "bg-transparent group-hover:bg-foreground/5")
          }
        >
          <Icon
            className={"size-5 transition-colors " + (active ? "text-primary" : "text-muted-foreground")}
            strokeWidth={active ? 2.4 : 2}
          />
        </span>
        <span
          className={
            "text-[9px] font-bold uppercase tracking-wider transition-colors " +
            (active ? "text-primary" : "text-muted-foreground")
          }
        >
          {label}
        </span>
        {active && (
          <span className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-primary shadow-glow" />
        )}
      </Link>
    </li>
  );
}
