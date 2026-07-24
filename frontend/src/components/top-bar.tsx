import { Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Menu, Bell, MapPin } from "lucide-react";
import type { ReactNode } from "react";
import { useProfile, countryOf } from "@/lib/user-store";


export function TopBar({
  title,
  subtitle,
  showBack = false,
  onMenu,
  right,
}: {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onMenu?: () => void;
  right?: ReactNode;
}) {
  const router = useRouter();
  const profile = useProfile();
  const country = countryOf(profile.country);
  const locationText = profile.city ? `${profile.city}, ${country.name}` : country.name;

  return (
    <header className="relative z-20 px-4 pt-5 pb-3">
      <div className="flex items-center gap-3 rounded-3xl glass-strong px-3 py-2.5 shadow-soft">
        {showBack ? (
          <button
            onClick={() => router.history.back()}
            aria-label="Back"
            className="grid size-10 place-items-center rounded-2xl bg-foreground/5 hover:bg-foreground/10 active:scale-95 transition"
          >
            <ArrowLeft className="size-5" />
          </button>
        ) : (
          <button
            onClick={onMenu}
            aria-label="Menu"
            className="grid size-10 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-glow active:scale-95 transition"
          >
            <Menu className="size-5" />
          </button>
        )}

        <div className="flex-1 min-w-0">
          {title ? (
            <>
              <div className="font-display text-sm font-bold leading-tight truncate">
                {title}
              </div>
              {subtitle && (
                <div className="text-[10px] text-muted-foreground truncate">
                  {subtitle}
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center gap-1.5 text-[11px]">
              <MapPin className="size-3.5 text-primary" />
              <div className="min-w-0">
                <div className="text-[9px] uppercase tracking-widest text-muted-foreground leading-none">
                  Location
                </div>
                <div className="text-xs font-semibold truncate">
                  <span className="mr-1">{country.flag}</span>{locationText}
                </div>

              </div>
            </div>
          )}
        </div>

        {right ?? (
          <Link
            to="/notifications"
            aria-label="Notifications"
            className="relative grid size-10 place-items-center rounded-2xl bg-foreground/5 hover:bg-foreground/10 active:scale-95 transition"
          >
            <Bell className="size-5" />
            <span className="absolute right-2 top-2 size-2 rounded-full bg-primary shadow-glow animate-glow-pulse" />
          </Link>
        )}
      </div>
    </header>
  );
}
