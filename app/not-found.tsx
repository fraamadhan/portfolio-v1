"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Radio, RotateCcw } from "lucide-react";

export default function NotFound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const vinylRef = useRef<HTMLDivElement | null>(null);

  if (typeof window !== "undefined") {
    (window as any).__is404 = true;
    window.dispatchEvent(new CustomEvent("app_404_active"));
  }

  useEffect(() => {
    const audio = new Audio("/audio/one-summers-day.mp3");
    audio.preload = "auto";
    audio.loop = true;
    audio.volume = 0.45;
    audioRef.current = audio;

    const playAudio = () => {
      audio.play().then(() => {
        document.removeEventListener("click", playAudio);
        document.removeEventListener("keydown", playAudio);
        if (vinylRef.current) {
          vinylRef.current.removeEventListener("mouseenter", playAudio);
        }
      }).catch((err) => {
        console.log("Autoplay blocked, waiting for user interaction.", err);
      });
    };

    // Try to play immediately
    playAudio();

    // Listen for interactions to bypass autoplay policy
    document.addEventListener("click", playAudio);
    document.addEventListener("keydown", playAudio);
    if (vinylRef.current) {
      vinylRef.current.addEventListener("mouseenter", playAudio);
    }

    return () => {
      if (typeof window !== "undefined") {
        (window as any).__is404 = false;
        window.dispatchEvent(new CustomEvent("app_404_inactive"));
      }
      audio.pause();
      document.removeEventListener("click", playAudio);
      document.removeEventListener("keydown", playAudio);
      if (vinylRef.current) {
        vinylRef.current.removeEventListener("mouseenter", playAudio);
      }
    };
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_40%),linear-gradient(180deg,#f8fafc_0%,#e2e8f0_100%)] px-4 text-slate-800 transition-colors duration-300 dark:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_40%),linear-gradient(180deg,#090d16_0%,#04060b_100%)] dark:text-white">
      {/* Background Music Waves pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:80px_80px] opacity-35 dark:bg-[linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)]" />
      
      {/* Ambient glowing musical blob */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[100px] sm:h-[500px] sm:w-[500px]" />

      <div className="relative z-10 flex flex-col items-center gap-6 text-center max-w-lg">
        {/* Floating Tag */}
        <div className="flex items-center gap-2 rounded-full border border-blue-300 bg-blue-50/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-600 shadow-[0_0_20px_rgba(59,130,246,0.08)] dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-400 dark:shadow-[0_0_20px_rgba(59,130,246,0.1)]">
          <Radio className="h-3.5 w-3.5 animate-pulse text-blue-500 dark:text-blue-400" />
          <span>Track Unavailable</span>
        </div>

        {/* Anime Image Container - styled like a spinning vinyl record */}
        <div
          ref={vinylRef}
          className="group relative mt-2 aspect-square w-48 overflow-hidden rounded-full border-4 border-blue-400/20 bg-neutral-200 shadow-[0_0_40px_rgba(59,130,246,0.1)] transition-transform duration-500 hover:scale-105 hover:border-blue-500/40 dark:border-blue-500/20 dark:bg-neutral-900 dark:shadow-[0_0_40px_rgba(59,130,246,0.15)] sm:w-56 cursor-pointer"
        >
          {/* Animated vinyl grooves overlay */}
          <div className="absolute inset-0 rounded-full border border-black/5 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.45)_75%)] z-10" />
          
          <Image
            src="/img/shinoa_hiragi.webp"
            alt="Shinoa Hiragi"
            fill
            className="object-cover object-center animate-[spin_25s_linear_infinite]"
            priority
          />
          
          {/* Vinyl center hole placeholder for music vibe */}
          <div className="absolute left-1/2 top-1/2 z-20 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blue-500 bg-white shadow-[inset_0_0_8px_rgba(0,0,0,0.2)] dark:bg-neutral-950 dark:shadow-[inset_0_0_8px_rgba(0,0,0,0.8)]" />
        </div>

        {/* Text Area */}
        <div className="space-y-3">
          <h1 className="font-sub-heading text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-400 to-blue-600 animate-pulse dark:from-blue-400 dark:via-sky-300 dark:to-blue-500">
            404
          </h1>
          <h2 className="font-sub-heading text-2xl font-semibold tracking-wide text-slate-800 dark:text-neutral-100">
            Whoops! Wrong Track! 🎵
          </h2>
          <p className="text-base leading-relaxed text-slate-600 dark:text-neutral-400 px-4">
            There is no content you can get here lol... Shinoa's just playing vinyls in this empty room. You should probably head back to the homepage!
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-sky-600 px-6 py-3.5 text-sm font-semibold tracking-wide text-white shadow-[0_10px_25px_-5px_rgba(59,130,246,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_30px_-5px_rgba(59,130,246,0.45)] active:translate-y-0"
          >
            <RotateCcw className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-45" />
            <span>Go Back to Homepage</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
