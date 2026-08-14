"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";

interface CollectionHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  accentColor: string; // tailwind gradient classes
}

export default function CollectionHero({
  eyebrow,
  title,
  description,
  accentColor,
}: CollectionHeroProps) {
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const slug = params?.slug as string || "";
  const backHref = slug ? `/${slug}` : "/";

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 0.8 }
      )
        .fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 16, filter: "blur(6px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 40, filter: "blur(10px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 },
          "-=0.3"
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="mb-16 pt-6 text-center flex flex-col items-center">
      <Link
        href={backHref}
        className="group mb-8 inline-flex w-fit items-center gap-2.5 rounded-full border border-slate-200 bg-white/80 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-800 shadow-sm transition-all duration-300 hover:bg-slate-50 hover:border-slate-300 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:border-white/20 hover:-translate-x-1"
      >
        <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
        <span>Back to Home</span>
      </Link>
      <div
        ref={lineRef}
        className={`mx-auto mb-6 h-[2px] w-16 rounded-full ${accentColor}`}
      />
      <p
        ref={eyebrowRef}
        className="mb-3 text-xs uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400"
      >
        {eyebrow}
      </p>
      <h1
        ref={titleRef}
        className="font-sub-heading pb-3 text-5xl leading-none tracking-tight text-gradient-primary sm:text-7xl"
      >
        {title}
      </h1>
      <p
        ref={descRef}
        className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg"
      >
        {description}
      </p>
    </div>
  );
}
