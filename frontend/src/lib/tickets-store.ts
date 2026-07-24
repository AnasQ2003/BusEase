// LocalStorage-backed overlay for ticket status + reschedule date changes.
// The seed trips live in tickets.tsx as base data; this store just records
// user-driven overrides (cancel / reschedule) so they persist across screens.
import { useEffect, useState } from "react";

export type TripStatus = "upcoming" | "completed" | "cancelled";

export type TicketOverride = {
  status?: TripStatus;
  date?: string;
};

const KEY = "velocity.tickets.overrides";
const EVT = "velocity:tickets";

function read(): Record<string, TicketOverride> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

function write(next: Record<string, TicketOverride>) {
  window.localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(EVT));
}

export function setOverride(pnr: string, patch: TicketOverride) {
  const all = read();
  all[pnr] = { ...all[pnr], ...patch };
  write(all);
}

export function useTicketOverrides(): Record<string, TicketOverride> {
  const [o, setO] = useState<Record<string, TicketOverride>>({});
  useEffect(() => {
    setO(read());
    const on = () => setO(read());
    window.addEventListener(EVT, on);
    window.addEventListener("storage", on);
    return () => {
      window.removeEventListener(EVT, on);
      window.removeEventListener("storage", on);
    };
  }, []);
  return o;
}

export function useTicketOverride(pnr: string): TicketOverride {
  const all = useTicketOverrides();
  return all[pnr] ?? {};
}

// Days-until helper — used for color coding upcoming trips
// (very-near = green, further-out = yellow).
export function daysUntil(dateStr: string): number {
  // Accepts free-form strings; tries to parse; returns Infinity if unknown.
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  // Try to pull "12 Oct" out of "Fri, 12 Oct · 21:30"
  const m = dateStr.match(/(\d{1,2})\s+([A-Za-z]{3,})/);
  if (!m) return Number.POSITIVE_INFINITY;
  const day = parseInt(m[1], 10);
  const monthName = m[2].slice(0, 3).toLowerCase();
  const months = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
  const mo = months.indexOf(monthName);
  if (mo < 0) return Number.POSITIVE_INFINITY;
  let year = now.getFullYear();
  const candidate = new Date(year, mo, day);
  if (candidate.getTime() < now.getTime() - 24 * 60 * 60 * 1000) {
    // Assume it rolls into next year
    candidate.setFullYear(year + 1);
  }
  const ms = candidate.getTime() - now.getTime();
  return Math.round(ms / (1000 * 60 * 60 * 24));
}
