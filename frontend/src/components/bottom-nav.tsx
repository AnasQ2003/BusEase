import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Ticket, Tag, User, Search } from "lucide-react";

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      aria-label="Primary"
      className="absolute inset-x-0 bottom-0 z-30 pointer-events-none pb-[max(env(safe-area-inset-bottom),0.5rem)]"
    >
      <div className="pointer-events-auto relative mx-4 mb-2 rounded-[28px] glass-strong shadow-elevated px-2 py-2">
        <ul className="grid grid-cols-5 items-center text-center">
          {/* 1. Home */}
          <NavItem to="/home" label="Home" Icon={Home} active={pathname === "/home"} />

          {/* 2. Trips */}
          <NavItem to="/tickets" label="Trips" Icon={Ticket} active={pathname === "/tickets"} />

          {/* 3. Search (Hero Center) */}
          <li className="flex justify-center">
            <Link
              to="/search"
              aria-label="Search"
              className="group relative flex flex-col items-center gap-0.5 rounded-2xl px-2 py-0.5"
            >
              <span className="relative grid size-11 place-items-center rounded-2xl gradient-sunrise text-primary-foreground shadow-glow active:scale-95 transition-transform">
                <span className="absolute inset-0 rounded-2xl bg-primary/30 blur-md animate-glow-pulse" />
                <Search className="relative size-5" strokeWidth={2.5} />
              </span>
              <span
                className={
                  "text-[9px] font-bold uppercase tracking-wider transition-colors " +
                  (pathname === "/search" ? "text-primary" : "text-muted-foreground")
                }
              >
                Search
              </span>
            </Link>
          </li>

          {/* 4. Offers */}
          <NavItem to="/offers" label="Offers" Icon={Tag} active={pathname === "/offers"} />

          {/* 5. Profile */}
          <NavItem to="/profile" label="Profile" Icon={User} active={pathname === "/profile"} />
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
    <li className="flex justify-center">
      <Link
        to={to}
        className="group relative flex flex-col items-center gap-0.5 rounded-2xl px-2 py-1"
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
