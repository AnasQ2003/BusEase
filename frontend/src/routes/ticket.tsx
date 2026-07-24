import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame } from "@/components/mobile-frame";
import { TopBar } from "@/components/top-bar";
import { useMemo, useState } from "react";
import {
  CheckCircle2,
  Download,
  Share2,
  MapPin,
  Clock,
  Wifi,
  Snowflake,
  Plug,
  Coffee,
  ShieldCheck,
  Phone,
  User as UserIcon,
  XCircle,
  CalendarClock,
  X,
  RefreshCw,
  Star,
  ChevronRight,
  Sun,
  Sunset,
  Moon,
} from "lucide-react";
import jsPDF from "jspdf";
import { useProfile, formatMoney, countryOf } from "@/lib/user-store";
import { setOverride, useTicketOverride } from "@/lib/tickets-store";

type SearchParams = {
  status?: "upcoming" | "completed" | "cancelled";
  from?: string;
  to?: string;
  date?: string;
  pnr?: string;
  price?: string;
};

export const Route = createFileRoute("/ticket")({
  head: () => ({ meta: [{ title: "Your ticket · Velocity" }] }),
  validateSearch: (s: Record<string, unknown>): SearchParams => ({
    status: (s.status as SearchParams["status"]) || "upcoming",
    from: (s.from as string) || undefined,
    to: (s.to as string) || undefined,
    date: (s.date as string) || undefined,
    pnr: (s.pnr as string) || undefined,
    price: (s.price as string) || undefined,
  }),
  component: Ticket,
});

function Ticket() {
  const search = Route.useSearch();
  const profile = useProfile();
  const country = countryOf(profile.country);

  const fromCity = search.from ?? "Delhi";
  const toCity = search.to ?? "Manali";
  const fromCode = fromCity.slice(0, 3).toUpperCase();
  const toCode = toCity.slice(0, 3).toUpperCase();
  const pnr = search.pnr ?? "VH-29384-LX10";
  const price = search.price ?? formatMoney(3515, profile.country);
  const originalDate = search.date ?? "Fri, 12 Oct · 21:30";

  const override = useTicketOverride(pnr);
  const status = (override.status ?? search.status ?? "upcoming") as
    | "upcoming"
    | "completed"
    | "cancelled";
  const dateStr = override.date ?? originalDate;
  const isDone = status === "completed";
  const isCanc = status === "cancelled";

  const [cancelOpen, setCancelOpen] = useState(false);
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  function flash(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  }

  function handleDownload() {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const W = doc.internal.pageSize.getWidth();
    const brand: [number, number, number] = [232, 121, 47];
    const dark: [number, number, number] = [30, 32, 46];
    const muted: [number, number, number] = [120, 124, 140];

    // ── Header band
    doc.setFillColor(...brand);
    doc.rect(0, 0, W, 90, "F");
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(26);
    doc.text("VELOCITY", 40, 45);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Luxury Intercity Bus Booking", 40, 62);
    doc.setFontSize(9);
    doc.text("E-Ticket · Boarding Pass", 40, 78);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(`PNR  ${pnr}`, W - 40, 45, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(
      `Status: ${status.toUpperCase()}`,
      W - 40,
      62,
      { align: "right" },
    );
    doc.text(
      `Issued: ${new Date().toLocaleDateString()}`,
      W - 40,
      78,
      { align: "right" },
    );

    // ── Route card
    let y = 120;
    doc.setDrawColor(230, 230, 235);
    doc.setLineWidth(1);
    doc.roundedRect(30, y, W - 60, 130, 12, 12, "S");
    doc.setTextColor(...muted);
    doc.setFontSize(8);
    doc.text("FROM", 50, y + 24);
    doc.text("TO", W - 50, y + 24, { align: "right" });

    doc.setFont("helvetica", "bold");
    doc.setTextColor(...dark);
    doc.setFontSize(28);
    doc.text(fromCode, 50, y + 58);
    doc.text(toCode, W - 50, y + 58, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(fromCity, 50, y + 78);
    doc.text(toCity, W - 50, y + 78, { align: "right" });

    // dotted route line
    doc.setDrawColor(...brand);
    doc.setLineDashPattern([2, 3], 0);
    doc.line(160, y + 50, W - 160, y + 50);
    doc.setLineDashPattern([], 0);
    doc.setFillColor(...brand);
    doc.circle(160, y + 50, 4, "F");
    doc.circle(W - 160, y + 50, 4, "F");

    doc.setFontSize(9);
    doc.setTextColor(...muted);
    doc.text("Volvo 9600 · Multi-Axle Sleeper", W / 2, y + 100, {
      align: "center",
    });
    doc.text("Approx duration: 12h 30m · 620 km", W / 2, y + 115, {
      align: "center",
    });

    // ── Passenger + trip details
    y += 155;
    doc.setDrawColor(230, 230, 235);
    doc.roundedRect(30, y, W - 60, 170, 12, 12, "S");

    const rows: [string, string][] = [
      ["Passenger", profile.name],
      ["Contact", profile.phone || "—"],
      ["Email", profile.email || "—"],
      ["Journey date", dateStr],
      ["Boarding", "ISBT Kashmiri Gate, Gate 4 · 21:15"],
      ["Drop point", `${toCity} Bus Stand · ~10:00`],
      ["Seats", "L1, L2 (Lower / Window)"],
      ["Coach", "Velocity Luxury Express · VL-4290"],
      ["Amenities", "Wi-Fi · AC · Charging · Snacks"],
      ["Amount paid", `${price} (${country.currency})`],
    ];
    doc.setFontSize(10);
    rows.forEach((r, i) => {
      const rowY = y + 22 + i * 15;
      doc.setTextColor(...muted);
      doc.setFont("helvetica", "normal");
      doc.text(r[0], 50, rowY);
      doc.setTextColor(...dark);
      doc.setFont("helvetica", "bold");
      doc.text(r[1], W - 50, rowY, { align: "right" });
    });

    // ── Terms
    y += 195;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...dark);
    doc.text("Important information", 30, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...muted);
    const terms = [
      "• Please arrive at the boarding point at least 15 minutes before departure.",
      "• Carry a valid government-issued photo ID matching the passenger name.",
      "• Free cancellation until 6 hours before departure. 10% fee applies after.",
      "• Luggage: 20 kg check-in + 7 kg cabin per passenger, complimentary.",
      "• For 24×7 support, call +92-300-VELOCITY or write to help@velocity.app.",
    ];
    terms.forEach((t, i) => doc.text(t, 30, y + 18 + i * 13));

    // ── Barcode strip
    y += 100;
    doc.setFillColor(20, 22, 32);
    doc.roundedRect(30, y, W - 60, 48, 6, 6, "F");
    for (let i = 0; i < 90; i++) {
      const bw = (i * 7) % 5 === 0 ? 2.5 : 1;
      doc.setFillColor(255, 255, 255);
      doc.rect(42 + i * ((W - 84) / 90), y + 6, bw, 36, "F");
    }
    doc.setFont("courier", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...muted);
    doc.text(pnr, W / 2, y + 68, { align: "center" });

    // Footer
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...muted);
    doc.text(
      "Thank you for riding with Velocity. Have a safe & pleasant trip.",
      W / 2,
      doc.internal.pageSize.getHeight() - 24,
      { align: "center" },
    );

    doc.save(`velocity-ticket-${pnr}.pdf`);
    flash("Ticket PDF downloaded");
  }

  async function handleShare() {
    const shareText = `My Velocity trip: ${fromCity} → ${toCity} on ${dateStr}. PNR ${pnr}.`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Velocity Ticket", text: shareText });
        return;
      }
      await navigator.clipboard.writeText(shareText);
      flash("Ticket details copied");
    } catch {
      flash("Sharing cancelled");
    }
  }

  return (
    <MobileFrame>
      <div className="relative h-full w-full overflow-hidden bg-background flex flex-col">
        <div
          className={
            "absolute inset-0 opacity-90 " +
            (isDone
              ? "bg-emerald-950/60"
              : isCanc
              ? "bg-destructive/20"
              : "gradient-dawn")
          }
        />
        <div
          className={
            "absolute -top-20 left-1/2 -translate-x-1/2 size-72 rounded-full blur-3xl animate-glow-pulse " +
            (isDone
              ? "bg-emerald-500/40"
              : isCanc
              ? "bg-destructive/40"
              : "bg-primary/40")
          }
        />

        <TopBar
          showBack
          title={isDone ? "Trip Summary" : isCanc ? "Cancelled Trip" : "E-Ticket"}
        />

        <div className="relative flex-1 overflow-y-auto no-scrollbar px-5 pb-6">
          {/* Status header */}
          <div className="flex flex-col items-center pt-2 pb-6 animate-fade-up">
            <div
              className={
                "grid size-16 place-items-center rounded-full shadow-glow " +
                (isDone
                  ? "bg-emerald-500"
                  : isCanc
                  ? "bg-destructive"
                  : "gradient-primary")
              }
            >
              {isDone ? (
                <CheckCircle2 className="size-8 text-white" strokeWidth={2.2} />
              ) : isCanc ? (
                <XCircle className="size-8 text-white" strokeWidth={2.2} />
              ) : (
                <CheckCircle2
                  className="size-8 text-primary-foreground"
                  strokeWidth={2.2}
                />
              )}
            </div>
            <div className="mt-3 font-display text-xl font-extrabold">
              {isDone
                ? "Trip Completed"
                : isCanc
                ? "Trip Cancelled"
                : "Booking Confirmed"}
            </div>
            <div className="text-xs text-muted-foreground">PNR {pnr}</div>
            {isCanc && (
              <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-destructive/15 px-3 py-1 text-[11px] font-bold text-destructive uppercase tracking-widest">
                <XCircle className="size-3" /> Refund in progress
              </div>
            )}
            {isDone && (
              <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] font-bold text-emerald-500">
                <Star className="size-3 fill-current" /> Thanks for riding with Velocity
              </div>
            )}
          </div>

          {/* Ticket / summary card */}
          <div
            className={
              "rounded-[28px] p-6 shadow-elevated " +
              (isDone
                ? "ticket-clip bg-emerald-50 text-emerald-950"
                : isCanc
                ? "ticket-clip bg-zinc-100 text-zinc-500"
                : "ticket-clip bg-white text-zinc-900")
            }
          >
            <div className="flex items-center justify-between">
              <div className="font-display text-lg font-black italic">VELOCITY</div>
              <div className="text-right">
                <div className="text-[9px] uppercase tracking-widest opacity-60">
                  Status
                </div>
                <div
                  className={
                    "text-xs font-bold uppercase " +
                    (isCanc ? "text-red-600" : "")
                  }
                >
                  {status}
                </div>
              </div>
            </div>

            <div
              className={
                "mt-8 flex items-start justify-between " +
                (isCanc ? "line-through" : "")
              }
            >
              <div>
                <div className="text-[10px] uppercase tracking-widest opacity-60">
                  From
                </div>
                <div className="font-display text-3xl font-extrabold leading-none">
                  {fromCode}
                </div>
                <div className="text-[10px] opacity-70 mt-1">{fromCity}</div>
              </div>
              <div className="flex-1 px-3 flex flex-col items-center pt-3">
                <div className="text-[9px] opacity-60 uppercase tracking-widest">
                  Journey
                </div>
                <div className="relative w-full mt-1 h-px bg-current opacity-30">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 size-2 rounded-full bg-primary" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 size-2 rounded-full bg-primary" />
                </div>
                <div className="mt-1 text-[10px] font-semibold opacity-50">
                  ━━━━━━
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-widest opacity-60">
                  To
                </div>
                <div className="font-display text-3xl font-extrabold leading-none">
                  {toCode}
                </div>
                <div className="text-[10px] opacity-70 mt-1">{toCity}</div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-y-4">
              <div>
                <div className="text-[9px] uppercase opacity-60">Date</div>
                <div className="text-xs font-bold">{dateStr}</div>
              </div>
              <div>
                <div className="text-[9px] uppercase opacity-60">Passenger</div>
                <div className="text-xs font-bold">{profile.name}</div>
              </div>
              <div>
                <div className="text-[9px] uppercase opacity-60">Amount</div>
                <div className="text-xs font-bold">{price}</div>
              </div>
              <div>
                <div className="text-[9px] uppercase opacity-60">Seats</div>
                <div className="text-xs font-bold">L1, L2 (Window)</div>
              </div>
            </div>

            <div className="mt-8 border-t-2 border-dashed border-current opacity-40 pt-5">
              <div className="h-16 w-full bg-zinc-900 flex items-center justify-center gap-[2px] px-4 rounded-md">
                {Array.from({ length: 44 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-full bg-white/90"
                    style={{ width: (i * 7) % 5 === 0 ? 3 : 1 }}
                  />
                ))}
              </div>
              <div className="mt-2 text-center text-[10px] font-mono tracking-[0.3em] opacity-60">
                {pnr}
              </div>
            </div>
          </div>

          {isDone && (
            <div className="mt-5 rounded-3xl glass-strong p-4">
              <div className="text-sm font-bold mb-2">How was your trip?</div>
              <div className="flex items-center gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button
                    key={i}
                    className="grid size-10 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-500 hover:scale-110 transition"
                  >
                    <Star className={"size-5 " + (i < 4 ? "fill-current" : "")} />
                  </button>
                ))}
              </div>
              <button className="mt-3 w-full h-11 rounded-2xl bg-emerald-500 text-white font-bold text-sm">
                Rebook this route
              </button>
            </div>
          )}

          {!isDone && !isCanc && (
            <>
              <div className="mt-5 rounded-3xl glass-strong p-4">
                <div className="flex items-center gap-3">
                  <div className="grid size-12 place-items-center rounded-2xl gradient-primary text-primary-foreground font-display font-black">
                    VL
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold">
                      Velocity Luxury Express
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      Volvo 9600 · Multi-Axle Sleeper
                    </div>
                  </div>
                  <a
                    href="tel:+911234567890"
                    className="grid size-10 place-items-center rounded-2xl bg-primary/15 text-primary"
                  >
                    <Phone className="size-4" />
                  </a>
                </div>
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {[
                    { icon: Wifi, label: "Wi-Fi" },
                    { icon: Snowflake, label: "AC" },
                    { icon: Plug, label: "Charge" },
                    { icon: Coffee, label: "Snacks" },
                  ].map((a) => (
                    <div
                      key={a.label}
                      className="flex flex-col items-center gap-1 rounded-xl bg-foreground/5 py-2"
                    >
                      <a.icon className="size-4 text-primary" />
                      <span className="text-[9px] font-semibold text-muted-foreground">
                        {a.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-3xl glass-strong p-4 space-y-3">
                <InfoRow
                  icon={<MapPin className="size-4 text-primary" />}
                  label="Boarding point"
                  value="ISBT Kashmiri Gate, Gate 4 · 21:15"
                />
                <InfoRow
                  icon={<UserIcon className="size-4 text-primary" />}
                  label="Driver / attendant"
                  value="Rajesh K. · +91 98••• ••210"
                />
                <InfoRow
                  icon={<ShieldCheck className="size-4 text-primary" />}
                  label="Cancellation"
                  value="Free until 6h before departure · then 10% fee"
                />
              </div>

              <div className="mt-4 rounded-3xl glass-strong p-4 flex items-center gap-3">
                <span className="relative grid size-10 place-items-center rounded-2xl bg-primary/15">
                  <MapPin className="size-5 text-primary" />
                  <span className="absolute inset-0 rounded-2xl animate-ripple bg-primary/50" />
                </span>
                <div className="flex-1">
                  <div className="text-sm font-semibold">Live boarding updates</div>
                  <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Clock className="size-3" /> Bus arrives at ISBT in 3h 12m
                  </div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <button
                  onClick={() => setRescheduleOpen(true)}
                  className="h-12 flex items-center justify-center gap-2 rounded-2xl glass-panel font-semibold text-sm active:scale-95 transition-transform"
                >
                  <CalendarClock className="size-4" /> Reschedule
                </button>
                <button
                  onClick={() => setCancelOpen(true)}
                  className="h-12 flex items-center justify-center gap-2 rounded-2xl bg-destructive/15 text-destructive font-semibold text-sm active:scale-95 transition-transform"
                >
                  <XCircle className="size-4" /> Cancel trip
                </button>
              </div>
            </>
          )}

          {isCanc && (
            <div className="mt-5 rounded-3xl glass-strong p-4 text-sm">
              <div className="font-bold text-destructive">Refund status</div>
              <div className="mt-1 text-xs text-muted-foreground">
                {price} was refunded to your Velocity Wallet. It'll reflect in
                your balance within 24 hours.
              </div>
            </div>
          )}

          <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              onClick={handleDownload}
              className="h-12 flex items-center justify-center gap-2 rounded-2xl glass-panel font-semibold text-sm active:scale-95 transition-transform"
            >
              <Download className="size-4" /> Download PDF
            </button>
            <button
              onClick={handleShare}
              className="h-12 flex items-center justify-center gap-2 rounded-2xl glass-panel font-semibold text-sm active:scale-95 transition-transform"
            >
              <Share2 className="size-4" /> Share
            </button>
          </div>

          <Link
            to="/home"
            className="mt-5 flex h-12 items-center justify-center rounded-2xl gradient-primary font-bold text-primary-foreground shadow-glow"
          >
            Back to home
          </Link>
        </div>

        {toast && (
          <div className="absolute left-1/2 -translate-x-1/2 bottom-20 z-50 rounded-full bg-foreground text-background text-xs font-bold px-4 py-2 shadow-elevated animate-fade-up">
            {toast}
          </div>
        )}

        {cancelOpen && (
          <ConfirmModal
            title="Cancel this trip?"
            body={`A 10% fee applies. ${price} minus fee will be refunded to your Velocity Wallet.`}
            confirmLabel="Yes, cancel trip"
            tone="destructive"
            onCancel={() => setCancelOpen(false)}
            onConfirm={() => {
              setCancelOpen(false);
              setOverride(pnr, { status: "cancelled" });
              flash("Trip cancelled · refund in progress");
            }}
          />
        )}

        {rescheduleOpen && (
          <RescheduleSheet
            currentDate={dateStr}
            onClose={() => setRescheduleOpen(false)}
            onDone={(newDate) => {
              setRescheduleOpen(false);
              setOverride(pnr, { date: newDate });
              flash("Trip rescheduled to " + newDate);
            }}
          />
        )}
      </div>
    </MobileFrame>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-10 place-items-center rounded-2xl bg-primary/15">
        {icon}
      </span>
      <div className="flex-1">
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
          {label}
        </div>
        <div className="text-sm font-semibold">{value}</div>
      </div>
    </div>
  );
}

// ── Reschedule flow: pick day → pick time slot → confirm ──────────────
function RescheduleSheet({
  currentDate,
  onClose,
  onDone,
}: {
  currentDate: string;
  onClose: () => void;
  onDone: (newDate: string) => void;
}) {
  const days = useMemo(() => {
    const arr: { key: string; day: string; dateNum: number; monthShort: string; full: Date }[] = [];
    const base = new Date();
    for (let i = 1; i <= 10; i++) {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      arr.push({
        key: d.toISOString().slice(0, 10),
        day: d.toLocaleDateString(undefined, { weekday: "short" }),
        dateNum: d.getDate(),
        monthShort: d.toLocaleDateString(undefined, { month: "short" }),
        full: d,
      });
    }
    return arr;
  }, []);

  const slots = [
    { id: "morning", label: "06:15", sub: "Morning · empty seats", icon: Sun, price: "+₹0" },
    { id: "afternoon", label: "13:45", sub: "Afternoon express", icon: Sunset, price: "+₹120" },
    { id: "evening", label: "18:30", sub: "Evening premium", icon: Sunset, price: "+₹150" },
    { id: "night", label: "21:30", sub: "Overnight sleeper", icon: Moon, price: "+₹0" },
  ];

  const [step, setStep] = useState<"day" | "time" | "confirm">("day");
  const [dayKey, setDayKey] = useState<string | null>(null);
  const [slotId, setSlotId] = useState<string | null>(null);

  const chosenDay = days.find((d) => d.key === dayKey) ?? null;
  const chosenSlot = slots.find((s) => s.id === slotId) ?? null;

  const newDateStr =
    chosenDay && chosenSlot
      ? `${chosenDay.day}, ${chosenDay.dateNum} ${chosenDay.monthShort} · ${chosenSlot.label}`
      : "";

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center">
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
      />
      <div className="relative w-full max-w-md rounded-t-[32px] glass-strong border border-foreground/10 p-5 pb-7 shadow-elevated animate-entrance">
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-foreground/20" />
        <div className="flex items-center justify-between">
          <div>
            <div className="font-display text-lg font-black">
              {step === "day"
                ? "Pick a new date"
                : step === "time"
                ? "Pick a time slot"
                : "Confirm reschedule"}
            </div>
            <div className="text-[11px] text-muted-foreground mt-0.5">
              Current: {currentDate}
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid size-9 place-items-center rounded-full bg-foreground/5 hover:bg-foreground/10"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Steps indicator */}
        <div className="mt-4 flex items-center gap-1.5">
          {(["day", "time", "confirm"] as const).map((s, i) => {
            const active =
              s === step ||
              (step === "time" && s === "day") ||
              (step === "confirm" && (s === "day" || s === "time"));
            return (
              <div
                key={s}
                className={
                  "h-1 flex-1 rounded-full transition-all " +
                  (active ? "gradient-primary" : "bg-foreground/10")
                }
                style={{ animationDelay: `${i * 50}ms` }}
              />
            );
          })}
        </div>

        {/* Step 1: day */}
        {step === "day" && (
          <div className="mt-4">
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
              {days.map((d) => {
                const active = dayKey === d.key;
                return (
                  <button
                    key={d.key}
                    onClick={() => setDayKey(d.key)}
                    className={
                      "min-w-[68px] rounded-2xl p-3 text-center transition-all " +
                      (active
                        ? "gradient-primary text-primary-foreground shadow-glow"
                        : "bg-foreground/5 hover:bg-foreground/10")
                    }
                  >
                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-80">
                      {d.day}
                    </div>
                    <div className="font-display text-xl font-extrabold mt-0.5">
                      {d.dateNum}
                    </div>
                    <div className="text-[10px] opacity-70">{d.monthShort}</div>
                  </button>
                );
              })}
            </div>
            <button
              disabled={!dayKey}
              onClick={() => setStep("time")}
              className="mt-4 flex h-12 w-full items-center justify-center gap-1 rounded-2xl gradient-primary font-bold text-primary-foreground shadow-glow disabled:opacity-50"
            >
              Continue <ChevronRight className="size-4" />
            </button>
          </div>
        )}

        {/* Step 2: time slots */}
        {step === "time" && chosenDay && (
          <div className="mt-4">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-[11px] font-bold text-primary">
              <CalendarClock className="size-3" /> {chosenDay.day},{" "}
              {chosenDay.dateNum} {chosenDay.monthShort}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {slots.map((s) => {
                const active = slotId === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSlotId(s.id)}
                    className={
                      "flex flex-col items-start rounded-2xl border p-3 text-left transition-all " +
                      (active
                        ? "border-primary/60 bg-primary/10 shadow-glow"
                        : "border-foreground/10 bg-foreground/5 hover:border-foreground/20")
                    }
                  >
                    <div className="flex items-center gap-2">
                      <s.icon
                        className={
                          "size-4 " + (active ? "text-primary" : "text-muted-foreground")
                        }
                      />
                      <span className="font-display text-lg font-extrabold">
                        {s.label}
                      </span>
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-1">
                      {s.sub}
                    </div>
                    <div className="mt-1 text-[10px] font-bold text-emerald-500">
                      {s.price} fee
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setStep("day")}
                className="h-12 flex-1 rounded-2xl bg-foreground/5 font-semibold text-sm"
              >
                Back
              </button>
              <button
                disabled={!slotId}
                onClick={() => setStep("confirm")}
                className="h-12 flex-[1.4] rounded-2xl gradient-primary font-bold text-sm text-primary-foreground shadow-glow disabled:opacity-50 flex items-center justify-center gap-1"
              >
                Review <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: confirm */}
        {step === "confirm" && chosenDay && chosenSlot && (
          <div className="mt-4">
            <div className="rounded-3xl glass-panel p-4">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                New departure
              </div>
              <div className="mt-1 font-display text-2xl font-extrabold">
                {newDateStr}
              </div>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Old departure</span>
                <span className="line-through text-muted-foreground">
                  {currentDate}
                </span>
              </div>
              <div className="mt-1 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Reschedule fee</span>
                <span className="font-semibold">{chosenSlot.price}</span>
              </div>
              <div className="mt-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 px-3 py-2 text-[11px] text-emerald-500 font-semibold">
                Seats L1, L2 are available on the new departure.
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setStep("time")}
                className="h-12 flex-1 rounded-2xl bg-foreground/5 font-semibold text-sm"
              >
                Back
              </button>
              <button
                onClick={() => onDone(newDateStr)}
                className="h-12 flex-[1.4] rounded-2xl gradient-primary font-bold text-sm text-primary-foreground shadow-glow"
              >
                Confirm reschedule
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ConfirmModal({
  title,
  body,
  confirmLabel,
  tone,
  icon,
  onCancel,
  onConfirm,
}: {
  title: string;
  body: string;
  confirmLabel: string;
  tone: "destructive" | "primary";
  icon?: React.ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="absolute inset-0 z-50 flex items-end sm:items-center justify-center">
      <button
        aria-label="Close"
        onClick={onCancel}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
      />
      <div className="relative w-[92%] max-w-sm rounded-3xl glass-strong border border-foreground/10 p-6 shadow-elevated animate-entrance mb-6">
        <button
          onClick={onCancel}
          aria-label="Close"
          className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-foreground/5 hover:bg-foreground/10 transition"
        >
          <X className="size-4" />
        </button>
        <div className="flex flex-col items-center text-center">
          <div
            className={
              "grid size-16 place-items-center rounded-[24px] shadow-glow " +
              (tone === "destructive"
                ? "bg-destructive text-white"
                : "gradient-sunrise text-primary-foreground")
            }
          >
            {icon ?? <XCircle className="size-7" />}
          </div>
          <h3 className="mt-4 font-display text-xl font-black">{title}</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {body}
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3 w-full">
            <button
              onClick={onCancel}
              className="h-12 rounded-2xl bg-foreground/5 font-semibold text-sm"
            >
              Keep it
            </button>
            <button
              onClick={onConfirm}
              className={
                "h-12 rounded-2xl font-bold text-sm text-white " +
                (tone === "destructive"
                  ? "bg-destructive"
                  : "gradient-primary text-primary-foreground shadow-glow")
              }
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
