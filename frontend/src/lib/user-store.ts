// Simple localStorage-backed "profile" store — no backend, purely UI state
// so onboarding country + editable personal info work across the app.
import { useEffect, useState } from "react";

export type UserProfile = {
  name: string;
  email: string;
  phone: string;
  country: string; // ISO-like key: PK, IN, US, AE, GB
  city: string;
  dob: string;
  gender: "male" | "female" | "other" | "";
  avatarInitials: string;
  avatarEmoji?: string;
};

const KEY = "velocity.profile";

const DEFAULT: UserProfile = {
  name: "Aarav Rana",
  email: "aarav@velocity.app",
  phone: "+92 300 1234567",
  country: "PK",
  city: "Karachi",
  dob: "1998-05-14",
  gender: "male",
  avatarInitials: "AR",
  avatarEmoji: "🚌",
};

export const AVATAR_EMOJIS = ["🚌","🚍","🚐","🚎","🚏","🎫","🛣️","🗺️","🧳","⛰️","🌄","🌅"] as const;

export function readProfile(): UserProfile {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return DEFAULT;
    return { ...DEFAULT, ...JSON.parse(raw) };
  } catch {
    return DEFAULT;
  }
}

export function writeProfile(p: Partial<UserProfile>) {
  if (typeof window === "undefined") return;
  const next = { ...readProfile(), ...p };
  next.avatarInitials =
    next.name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((s) => s[0]?.toUpperCase() ?? "")
      .join("") || "V";
  window.localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("velocity:profile"));
}

export function useProfile(): UserProfile {
  const [p, setP] = useState<UserProfile>(DEFAULT);
  useEffect(() => {
    setP(readProfile());
    const on = () => setP(readProfile());
    window.addEventListener("velocity:profile", on);
    window.addEventListener("storage", on);
    return () => {
      window.removeEventListener("velocity:profile", on);
      window.removeEventListener("storage", on);
    };
  }, []);
  return p;
}

export const COUNTRIES = [
  { code: "PK", name: "Pakistan", flag: "🇵🇰", dial: "+92", currency: "PKR", symbol: "₨" },
  { code: "IN", name: "India", flag: "🇮🇳", dial: "+91", currency: "INR", symbol: "₹" },
  { code: "AE", name: "UAE", flag: "🇦🇪", dial: "+971", currency: "AED", symbol: "د.إ" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", dial: "+44", currency: "GBP", symbol: "£" },
  { code: "US", name: "United States", flag: "🇺🇸", dial: "+1", currency: "USD", symbol: "$" },
] as const;

// Conversion rates FROM 1 INR (base). App-internal prices are stored in INR
// and formatted via formatMoney() for the user's selected country.
const INR_RATES: Record<string, number> = {
  INR: 1,
  PKR: 3.35,
  AED: 0.044,
  GBP: 0.0095,
  USD: 0.012,
};

export function formatMoney(inrAmount: number, countryCode: string): string {
  const c = countryOf(countryCode);
  const rate = INR_RATES[c.currency] ?? 1;
  const converted = inrAmount * rate;
  // Whole units for high-denomination currencies; 2 decimals otherwise
  const isWhole = c.currency === "INR" || c.currency === "PKR";
  const rounded = isWhole ? Math.round(converted) : Math.round(converted * 100) / 100;
  const locale = c.code === "IN" || c.code === "PK" ? "en-IN" : "en-US";
  const nice = rounded.toLocaleString(locale, {
    minimumFractionDigits: isWhole ? 0 : 2,
    maximumFractionDigits: isWhole ? 0 : 2,
  });
  return `${c.symbol}${nice}`;
}

export function currencyCode(countryCode: string): string {
  return countryOf(countryCode).currency;
}

export type CountryRoute = {
  from: string;
  to: string;
  price: number;
  time: string;
  tag: string;
};

export const COUNTRY_ROUTES: Record<
  string,
  { hub: string; routes: CountryRoute[] }
> = {
  PK: {
    hub: "Karachi, Pakistan",
    routes: [
      { from: "Karachi", to: "Lahore", price: 4500, time: "18h 20m", tag: "Popular" },
      { from: "Islamabad", to: "Murree", price: 850, time: "2h 15m", tag: "Scenic" },
      { from: "Lahore", to: "Multan", price: 2100, time: "5h 30m", tag: "Business" },
      { from: "Karachi", to: "Hyderabad", price: 950, time: "2h 45m", tag: "Weekend" },
      { from: "Peshawar", to: "Swat", price: 1400, time: "5h 10m", tag: "Hills" },
    ],
  },
  IN: {
    hub: "New Delhi, India",
    routes: [
      { from: "Delhi", to: "Manali", price: 1850, time: "12h 30m", tag: "Hot" },
      { from: "Mumbai", to: "Goa", price: 2450, time: "14h 15m", tag: "Weekend" },
      { from: "Bangalore", to: "Coorg", price: 1299, time: "7h 45m", tag: "Scenic" },
      { from: "Chennai", to: "Pondicherry", price: 799, time: "3h 20m", tag: "Beach" },
      { from: "Jaipur", to: "Udaipur", price: 1100, time: "6h 40m", tag: "Heritage" },
    ],
  },
  AE: {
    hub: "Dubai, UAE",
    routes: [
      { from: "Dubai", to: "Abu Dhabi", price: 25, time: "1h 45m", tag: "Business" },
      { from: "Dubai", to: "Sharjah", price: 10, time: "0h 40m", tag: "Daily" },
      { from: "Abu Dhabi", to: "Al Ain", price: 20, time: "2h 10m", tag: "Weekend" },
      { from: "Dubai", to: "Fujairah", price: 30, time: "2h 30m", tag: "Coast" },
    ],
  },
  GB: {
    hub: "London, UK",
    routes: [
      { from: "London", to: "Manchester", price: 22, time: "4h 30m", tag: "Popular" },
      { from: "London", to: "Edinburgh", price: 45, time: "9h 15m", tag: "Overnight" },
      { from: "Birmingham", to: "Liverpool", price: 15, time: "2h 20m", tag: "Weekend" },
      { from: "London", to: "Brighton", price: 12, time: "2h 10m", tag: "Coast" },
    ],
  },
  US: {
    hub: "New York, USA",
    routes: [
      { from: "New York", to: "Boston", price: 39, time: "4h 30m", tag: "Popular" },
      { from: "Los Angeles", to: "Las Vegas", price: 45, time: "5h 45m", tag: "Weekend" },
      { from: "Chicago", to: "Detroit", price: 32, time: "5h 20m", tag: "Business" },
      { from: "Washington", to: "New York", price: 29, time: "4h 20m", tag: "Daily" },
    ],
  },
};

export function countryOf(code: string) {
  return COUNTRIES.find((c) => c.code === code) ?? COUNTRIES[0];
}
