import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";

/**
 * Realistic iPhone 15 Pro-style hardware frame.
 *
 * Includes:
 * - Titanium chassis with physical side buttons and glass glare
 * - Dynamic Island & Status Bar with backdrop blur scrim so scrolling text cleanly dissolves underneath
 * - Safe-area padding top (54px) & bottom (28px)
 */
export const SAFE_TOP    = 54; // px (status bar + notch clearance)
export const SAFE_BOTTOM = 28; // px (home bar clearance)

export function MobileFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  /* Live clock */
  const now  = new Date();
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });

  return (
    /* ── Desktop backdrop ── */
    <div
      className="min-h-[100dvh] w-full flex items-center justify-center"
      style={{
        background:
          "radial-gradient(70% 60% at 50% 0%, rgba(255,120,50,0.18) 0%, transparent 60%)," +
          "radial-gradient(60% 50% at 100% 100%, rgba(160,80,255,0.16) 0%, transparent 60%)," +
          "#0b0f1a",
      }}
    >
      {/* ── Outer phone shell ── */}
      <div
        className={"relative select-none " + className}
        style={{ width: "clamp(300px, 90vw, 393px)", height: "clamp(620px, 95dvh, 852px)" }}
      >

        {/* ── Physical side buttons ── */}
        <Btn side="left" top={108} h={32} />
        <Btn side="left" top={162} h={62} />
        <Btn side="left" top={240} h={62} />
        <Btn side="right" top={180} h={86} />

        {/* ── Titanium chassis ── */}
        <div
          style={{
            position: "absolute", inset: 0, borderRadius: "50px",
            background:
              "linear-gradient(145deg,#4a4a4e 0%,#2c2c2e 30%,#3a3a3c 55%,#1c1c1e 80%,#2a2a2c 100%)",
            boxShadow:
              "0 48px 96px -20px rgba(0,0,0,0.90)," +
              "inset 0 1px 0 rgba(255,255,255,0.14)," +
              "inset 0 -1px 0 rgba(0,0,0,0.5)," +
              "0 0 0 1px rgba(255,255,255,0.07)",
          }}
        />

        {/* ── Inner bezel ── */}
        <div style={{ position:"absolute", inset:"3px", borderRadius:"47px", background:"#000" }} />

        {/* ── Screen glass ── */}
        <div
          style={{
            position: "absolute", inset: "6px", borderRadius: "44px",
            overflow: "hidden", background: "#000",
          }}
        >
          {/* Screen glare overlay */}
          <div
            aria-hidden="true"
            style={{
              position:"absolute", inset:0, zIndex:50, pointerEvents:"none", borderRadius:"44px",
              background:"linear-gradient(130deg, rgba(255,255,255,0.08) 0%, transparent 38%)",
            }}
          />

          {/* ── Status Bar Glass Scrim (Frosted background overlay so scrolling text dissolves under clock & notch) ── */}
          <div
            aria-hidden="true"
            style={{
              position:"absolute", top:0, left:0, right:0,
              height:`${SAFE_TOP + 10}px`, zIndex:35, pointerEvents:"none",
              background:
                "linear-gradient(to bottom, rgba(11,15,26,0.96) 0%, rgba(11,15,26,0.85) 60%, rgba(11,15,26,0) 100%)",
              backdropFilter: "blur(16px) saturate(140%)",
              WebkitBackdropFilter: "blur(16px) saturate(140%)",
            }}
          />

          {/* ── Status Bar Content (Clock, Dynamic Island, Signal/Battery icons) ── */}
          <div
            aria-hidden="true"
            style={{
              position:"absolute", top:0, left:0, right:0,
              height:`${SAFE_TOP}px`, zIndex:40, pointerEvents:"none",
              display:"flex", alignItems:"flex-end",
              paddingBottom:"7px", paddingLeft:"26px", paddingRight:"22px",
              color:"#fff", fontSize:"12px", fontWeight:600,
              fontFamily:"'Inter Variable','Inter',sans-serif", letterSpacing:"0.01em",
            }}
          >
            {/* Time */}
            <span style={{ flex:"0 0 auto", minWidth:"42px" }}>{time}</span>

            {/* Dynamic Island */}
            <div
              style={{
                flex:1, display:"flex", justifyContent:"center",
                alignItems:"flex-start", paddingTop:"10px", marginTop:"-16px",
              }}
            >
              <div
                style={{
                  width:"126px", height:"34px", background:"#000",
                  borderRadius:"20px",
                  boxShadow:"inset 0 0 0 1px rgba(255,255,255,0.06), 0 2px 14px rgba(0,0,0,0.9)",
                  display:"flex", alignItems:"center",
                  justifyContent:"space-around", padding:"0 14px",
                }}
              >
                {/* Camera dot */}
                <div style={{ width:"12px", height:"12px", borderRadius:"50%", background:"#111", border:"1px solid rgba(255,255,255,0.07)", boxShadow:"inset 0 0 0 3px #0a0a0a" }} />
                {/* Face-ID sensor */}
                <div style={{ width:"36px", height:"8px", borderRadius:"4px", background:"#111", border:"1px solid rgba(255,255,255,0.04)" }} />
              </div>
            </div>

            {/* Right icons */}
            <div style={{ flex:"0 0 auto", display:"flex", alignItems:"center", gap:"5px" }}>
              {/* Cellular */}
              <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                <rect x="0"    y="8" width="3" height="4"  rx="0.8" fill="white"/>
                <rect x="4.5"  y="5" width="3" height="7"  rx="0.8" fill="white"/>
                <rect x="9"    y="2" width="3" height="10" rx="0.8" fill="white"/>
                <rect x="13.5" y="0" width="3" height="12" rx="0.8" fill="white"/>
              </svg>
              {/* Wi-Fi */}
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                <path d="M8 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" fill="white"/>
                <path d="M3.3 6.7a6.6 6.6 0 0 1 9.4 0" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                <path d="M0.5 4a10.4 10.4 0 0 1 15 0" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
              </svg>
              {/* Battery */}
              <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
                <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="white" strokeOpacity="0.4"/>
                <rect x="2"   y="2"   width="16" height="8"  rx="2"   fill="white"/>
                <path d="M23 4v4a2 2 0 0 0 0-4Z" fill="white" fillOpacity="0.4"/>
              </svg>
            </div>
          </div>

          {/* ── App content (safe-area top & bottom padded) ── */}
          <div
            style={{
              position:"absolute", inset:0,
              paddingTop:`${SAFE_TOP}px`,
              paddingBottom:`${SAFE_BOTTOM}px`,
              overflowY:"auto", overflowX:"hidden",
              WebkitOverflowScrolling:"touch",
              boxSizing:"border-box",
              "--safe-top":`${SAFE_TOP}px`,
              "--safe-bottom":`${SAFE_BOTTOM}px`,
            } as React.CSSProperties}
            className="no-scrollbar flex flex-col"
          >
            {children}
          </div>

          {/* ── Home indicator scrim & bar ── */}
          <div
            aria-hidden="true"
            style={{
              position:"absolute", bottom:0, left:0, right:0,
              height:`${SAFE_BOTTOM + 6}px`, zIndex:35, pointerEvents:"none",
              background:
                "linear-gradient(to top, rgba(11,15,26,0.85) 0%, rgba(11,15,26,0) 100%)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position:"absolute", bottom:"8px", left:"50%",
              transform:"translateX(-50%)",
              width:"134px", height:"5px", borderRadius:"3px",
              background:"rgba(255,255,255,0.38)", zIndex:40,
              pointerEvents:"none",
            }}
          />
          {/* In-app Toast Container */}
          <Toaster position="top-center" className="!absolute !top-16 !left-0 !right-0 !w-full !px-3 pointer-events-auto z-[9999]" />
        </div>{/* /screen */}
      </div>{/* /chassis */}
    </div>
  );
}

/* ── Helper: physical button nub ── */
function Btn({ side, top, h }: { side:"left"|"right"; top:number; h:number }) {
  const isLeft = side === "left";
  return (
    <div
      aria-hidden="true"
      style={{
        position:"absolute",
        [isLeft ? "left" : "right"]: "-3px",
        top:`${top}px`,
        width:"3px",
        height:`${h}px`,
        borderRadius: isLeft ? "3px 0 0 3px" : "0 3px 3px 0",
        background:"linear-gradient(180deg,#3d3d3f,#28282a)",
        boxShadow: isLeft
          ? "-2px 0 8px rgba(0,0,0,0.6), inset -1px 0 0 rgba(255,255,255,0.06)"
          : "2px 0 8px rgba(0,0,0,0.6), inset 1px 0 0 rgba(255,255,255,0.06)",
      }}
    />
  );
}
