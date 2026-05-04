"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useTranslation } from "@/hooks/useTranslation";

export default function MusicComingSoon() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const spotifyRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating animation for the Spotify logo box
      gsap.to(spotifyRef.current, {
        y: -12,
        duration: 2.5,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Pulse rings
      gsap.fromTo(
        pulseRef.current,
        { scale: 1, opacity: 0.6 },
        { scale: 1.8, opacity: 0, duration: 2, ease: "power1.out", repeat: -1 }
      );

      // Text entrance
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        containerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8 }
      ).fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.4"
      );

      // Animated equalizer bars
      const bars = containerRef.current?.querySelectorAll(".eq-bar");
      bars?.forEach((bar, i) => {
        gsap.to(bar, {
          scaleY: gsap.utils.random(0.3, 1),
          duration: gsap.utils.random(0.4, 0.8),
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.08,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center py-16 text-center">
      {/* Spotify Icon with pulse + float */}
      <div className="relative mb-10 flex items-center justify-center">
        {/* Pulse ring */}
        <div
          ref={pulseRef}
          className="absolute h-28 w-28 rounded-full bg-[#1DB954]/20"
        />
        {/* Logo box */}
        <div
          ref={spotifyRef}
          className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-[#1DB954] shadow-[0_0_40px_rgba(29,185,84,0.4)]"
        >
          {/* Spotify SVG */}
          <svg viewBox="0 0 24 24" className="h-12 w-12" fill="white">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
        </div>
      </div>

      {/* Equalizer bars animation */}
      <div className="mb-8 flex items-end gap-1" style={{ height: 40 }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="eq-bar w-2 rounded-full bg-[#1DB954]"
            style={{ height: "100%", transformOrigin: "bottom", scale: 0.5 }}
          />
        ))}
      </div>

      <div ref={textRef} className="max-w-md space-y-3">
        <h2 className="font-sub-heading text-3xl tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          {t("collection.music.coming_soon")}
        </h2>
        <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          {t("collection.music.coming_soon_desc")}
        </p>
      </div>
    </div>
  );
}
