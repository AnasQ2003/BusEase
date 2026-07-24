import type { ReactNode } from "react";

export function MobileFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground">
      <div
        className="fixed inset-0 -z-10 hidden md:block"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(255,120,50,0.22) 0%, transparent 60%), radial-gradient(50% 50% at 100% 100%, rgba(160,80,255,0.20) 0%, transparent 60%), #0b0f1a",
        }}

        aria-hidden="true"
      />
      <div className="flex min-h-[100dvh] w-full items-center justify-center md:p-8">
        <div
          className={
            "relative w-full max-w-full md:w-[390px] md:h-[844px] md:rounded-[42px] md:border md:border-foreground/10 md:shadow-elevated overflow-hidden bg-background " +
            className
          }
        >
          <div className="relative h-[100dvh] md:h-full w-full overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
