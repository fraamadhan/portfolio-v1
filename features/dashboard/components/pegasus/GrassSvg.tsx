"use client";

import { useMemo } from "react";

export default function GrassSvg({
  x,
  y,
  duration = 3000,
}: {
  x: number;
  y: number;
  duration?: number;
}) {
  const seed = useMemo(() => Math.random(), []);

  return (
    <div
      className="absolute animate-in fade-in zoom-in slide-out-to-bottom-2 fade-out pointer-events-none z-10"
      style={{
        left: `${x}px`,
        bottom: `${y}px`,
        animationDuration: `${duration}ms`,
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: `scale(${0.8 + seed * 0.4})` }}
      >
        <path
          d="M12 22C12 22 11 16 8 14M12 22C12 22 13 16 16 14M12 22V12M12 22C12 22 10 18 6 18M12 22C12 22 14 18 18 18"
          stroke="#4ade80"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
