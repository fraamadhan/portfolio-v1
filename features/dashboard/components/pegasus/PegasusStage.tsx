"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import PegasusCharacter from "./PegasusCharacter";

export default function PegasusStage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stageWidth, setStageWidth] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setStageWidth(entry.contentRect.width);
      }
    });

    observer.observe(containerRef.current);
    setStageWidth(containerRef.current.getBoundingClientRect().width);

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute bottom-0 left-0 w-full h-32 overflow-hidden pointer-events-none"
    >
      {/* Grass Row Texture */}
      <div 
        className="absolute bottom-0 left-0 w-full h-8 opacity-80" 
        style={{
          backgroundImage: `url('data:image/svg+xml;utf8,<svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C12 22 11 16 8 14M12 22C12 22 13 16 16 14M12 22V12M12 22C12 22 10 18 6 18M12 22C12 22 14 18 18 18" stroke="%234ade80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>')`,
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'bottom'
        }}
      ></div>

      {/* Background decoration for the stage could go here if needed */}
      <div className="absolute bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-300/50 dark:via-slate-700/50 to-transparent"></div>
      
      {/* Enable pointer events on the character only */}
      <div className="pointer-events-auto">
        {stageWidth > 0 && (
          <PegasusCharacter stageWidth={stageWidth} isDarkMode={theme === "dark"} />
        )}
      </div>
    </div>
  );
}
