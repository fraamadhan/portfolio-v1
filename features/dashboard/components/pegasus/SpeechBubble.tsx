"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SpeechBubbleProps {
  message: string | null;
  position?: number;
  stageWidth?: number;
  className?: string;
}

export default function SpeechBubble({ message, position = 0, stageWidth = 0, className }: SpeechBubbleProps) {
  const isVisible = Boolean(message);

  let xShift = "-50%";
  let tailLeft = "50%";
  
  if (stageWidth > 0) {
    if (position < 90) {
      xShift = "-20%";
      tailLeft = "20%";
    } else if (position > stageWidth - 90) {
      xShift = "-80%";
      tailLeft = "80%";
    }
  }

  return (
    <div
      className={cn(
        "absolute -top-12 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-800 bg-white border border-slate-200 shadow-md transition-all duration-300 z-50 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700 whitespace-nowrap",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none",
        className
      )}
      style={{
        left: "50%",
        transform: `translateX(${xShift}) ${isVisible ? 'translateY(0)' : 'translateY(8px)'}`
      }}
    >
      {message}
      {/* Speech bubble tail */}
      <div 
        className="absolute -bottom-1.5 w-3 h-3 bg-white border-b border-r border-slate-200 dark:bg-slate-800 dark:border-slate-700"
        style={{ left: tailLeft, transform: "translateX(-50%) rotate(45deg)", transition: "left 0.3s ease-out" }}
      ></div>
    </div>
  );
}
