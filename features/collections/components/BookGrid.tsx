"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Book } from "@/features/collections/data/dummyData";
import { useTranslation } from "@/hooks/useTranslation";

gsap.registerPlugin(ScrollTrigger);

const STATUS_MAP = {
  reading: { key: "collection.book.status_reading", color: "bg-blue-500/15 text-blue-500 dark:text-blue-400" },
  completed: { key: "collection.book.status_completed", color: "bg-green-500/15 text-green-600 dark:text-green-400" },
  "want-to-read": { key: "collection.book.status_want", color: "bg-amber-500/15 text-amber-600 dark:text-amber-400" },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-3 w-3 ${i < rating ? "text-amber-400" : "text-slate-300 dark:text-slate-600"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function BookGrid({ books }: { books: Book[] }) {
  const { t } = useTranslation();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(".book-card");
      if (!cards) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 60, scale: 0.94, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
          },
        }
      );

      // Magnetic hover on each card
      cards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
          const rect = (card as HTMLElement).getBoundingClientRect();
          const mouseEvent = e as MouseEvent;
          const x = ((mouseEvent.clientX - rect.left) / rect.width - 0.5) * 12;
          const y = ((mouseEvent.clientY - rect.top) / rect.height - 0.5) * 12;
          gsap.to(card, { rotateX: -y, rotateY: x, duration: 0.3, ease: "power2.out", transformPerspective: 800 });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: "power3.out" });
        });
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
    >
      {books.map((book) => {
        const statusMeta = STATUS_MAP[book.status];
        return (
          <div
            key={book.id}
            className="book-card group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 shadow-md backdrop-blur-sm transition-shadow duration-300 hover:shadow-2xl dark:border-white/10 dark:bg-white/[0.04]"
            style={{ willChange: "transform" }}
          >
            {/* Cover */}
            <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800/50">
              <Image
                src={book.coverUrl}
                alt={book.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent) {
                    parent.classList.add("flex", "items-center", "justify-center");
                    const placeholder = document.createElement("div");
                    placeholder.className = "text-4xl opacity-30";
                    placeholder.textContent = "📚";
                    parent.appendChild(placeholder);
                  }
                }}
              />
              {/* Overlay gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              {/* Year badge */}
              <span className="absolute right-2 top-2 rounded-full bg-black/40 px-2 py-0.5 text-[10px] text-white backdrop-blur-sm">
                {book.year}
              </span>
            </div>

            {/* Info */}
            <div className="flex flex-1 flex-col gap-1.5 p-3">
              <h3 className="line-clamp-2 text-sm font-semibold leading-tight text-slate-900 dark:text-white">
                {book.title}
              </h3>
              <p className="line-clamp-1 text-xs text-slate-500 dark:text-slate-400">{book.author}</p>

              <div className="mt-auto flex items-center justify-between pt-2">
                {book.rating && <StarRating rating={book.rating} />}
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${statusMeta.color}`}
                >
                  {t(statusMeta.key)}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
