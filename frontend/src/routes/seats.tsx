import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame } from "@/components/mobile-frame";
import { TopBar } from "@/components/top-bar";
import { useState } from "react";
import { Bus } from "lucide-react";
import { useProfile, formatMoney } from "@/lib/user-store";

export const Route = createFileRoute("/seats")({
  head: () => ({ meta: [{ title: "Select seats · Velocity" }] }),
  component: Seats,
});

type Status = "avail" | "female" | "sold" | "selected";

// Sleeper layout — 12 rows, columns [L, gap, R1, R2] using nulls for aisles
function makeLayout(): (Status | null)[][] {
  const seats: Status[][] = [];
  const rng = [4, 7, 10]; // pre-sold rows
  for (let r = 0; r < 12; r++) {
    seats.push([
      rng.includes(r) ? "sold" : r % 5 === 0 ? "female" : "avail",
      r === 6 ? "sold" : "avail",
      r === 6 ? "sold" : "avail",
    ]);
  }
  return seats.map(([a, b, c]) => [a, null, b, c]);
}

const seatColor: Record<Status, string> = {
  avail: "border-foreground/15 bg-white/[0.03] hover:border-primary/60",
  female: "border-pink-400/40 bg-pink-400/10",
  sold: "border-foreground/5 bg-white/[0.02] opacity-40",
  selected: "gradient-primary border-transparent shadow-glow text-primary-foreground",
};

function Seats() {
  const layout = makeLayout();
  const [selected, setSelected] = useState<string[]>(["L1", "L2"]);
  const price = 1850;
  const profile = useProfile();

  const toggle = (id: string, s: Status) => {
    if (s === "sold") return;
    setSelected((sel) =>
      sel.includes(id) ? sel.filter((x) => x !== id) : [...sel, id],
    );
  };

  return (
    <MobileFrame>
      <div className="relative h-full w-full overflow-hidden bg-background flex flex-col">
        <TopBar showBack title="Select Seats" />

        {/* Legend */}
        <div className="px-5">
          <div className="flex items-center justify-between rounded-2xl glass-panel p-3">
            {[
              { c: "bg-white/[0.03] border border-foreground/15", l: "Available" },
              { c: "gradient-primary", l: "Selected" },
              { c: "bg-pink-400/10 border border-pink-400/40", l: "Ladies" },
              { c: "bg-white/[0.02] border border-foreground/5", l: "Sold" },
            ].map((k) => (
              <div key={k.l} className="flex items-center gap-1.5">
                <span className={"size-3 rounded " + k.c} />
                <span className="text-[10px] text-muted-foreground">{k.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bus shell */}
        <div className="flex-1 px-5 py-4 overflow-y-auto no-scrollbar">
          <div className="mx-auto max-w-[300px] rounded-[36px] border border-foreground/10 bg-surface p-5 shadow-elevated">
            <div className="flex items-center justify-end pb-3 border-b border-dashed border-foreground/10">
              <div className="grid size-9 place-items-center rounded-xl bg-foreground/5">
                <Bus className="size-4 text-primary" />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-4 gap-2">
              {layout.map((row, ri) =>
                row.map((s, ci) => {
                  if (s === null) return <div key={`${ri}-${ci}`} />;
                  const id =
                    (ci === 0 ? "L" : "U") +
                    (ci === 0 ? ri + 1 : ci === 2 ? ri + 1 : ri + 13);
                  const isSel = selected.includes(id);
                  const stat: Status = isSel ? "selected" : s;
                  return (
                    <button
                      key={id}
                      onClick={() => toggle(id, s)}
                      className={
                        "h-9 rounded-lg border text-[9px] font-bold transition-all active:scale-95 " +
                        seatColor[stat]
                      }
                    >
                      {stat !== "sold" ? id : ""}
                    </button>
                  );
                }),
              )}
            </div>

            <div className="mt-5 text-center text-[10px] uppercase tracking-widest text-muted-foreground">
              ── Rear ──
            </div>
          </div>

          {/* Boarding */}
          <div className="mt-5 rounded-2xl glass-panel p-4">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Boarding point
            </div>
            <div className="mt-1 font-semibold text-sm">
              Kashmiri Gate ISBT · 21:15 PM
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="glass-strong border-t border-foreground/10 p-4 pb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                {selected.length} seat{selected.length !== 1 && "s"} · {selected.join(", ") || "—"}
              </div>
              <div className="font-display text-2xl font-extrabold">
                {formatMoney(price * selected.length, profile.country)}
              </div>
            </div>
            <Link
              to="/passenger"
              className="btn-shimmer h-12 px-6 flex items-center justify-center rounded-2xl gradient-primary font-bold text-primary-foreground shadow-glow active:scale-95 transition-transform"
            >
              Continue
            </Link>
          </div>
        </div>
      </div>
    </MobileFrame>
  );
}
