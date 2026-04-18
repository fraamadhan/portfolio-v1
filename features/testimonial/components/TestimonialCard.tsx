import { Quote } from "lucide-react";

import { cn } from "@/lib/utils";
import { TestimonialItemProps } from "@/types";

type TestimonialCardProps = {
  testimonial: TestimonialItemProps;
  rotationClassName: string;
};

const TestimonialCard = ({ testimonial, rotationClassName }: TestimonialCardProps) => {
  return (
    <article
      className={cn(
        "group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-[24px] border border-white/7 bg-[linear-gradient(180deg,rgba(28,42,60,0.96),rgba(19,28,39,0.98))] p-5 shadow-[0_18px_40px_rgba(4,10,18,0.28)] transition duration-300 hover:-translate-y-1 hover:rotate-0 hover:border-primary-100/30 hover:shadow-[0_22px_48px_rgba(4,10,18,0.38)]",
        rotationClassName
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(154,186,223,0.14),transparent_32%),linear-gradient(145deg,transparent,rgba(255,255,255,0.02))]" />

      <div className="relative flex items-start justify-between gap-4">
        <span className="max-w-[calc(100%-3rem)] rounded-full border border-primary-100/18 bg-primary-100/7 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-primary-100/75 break-words [overflow-wrap:anywhere]">
          {testimonial.tag}
        </span>
        <Quote className="h-8 w-8 shrink-0 text-primary-100/20" />
      </div>

      <p className="relative mt-5 text-sm leading-7 text-neutral-100/95 break-words [overflow-wrap:anywhere] sm:text-[15px]">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <footer className="relative mt-6 flex items-end justify-between gap-3 border-t border-white/8 pt-4">
        <div className="min-w-0 flex-1">
          <p className="font-sub-heading text-xl tracking-wide text-neutral-100 break-words [overflow-wrap:anywhere]">
            {testimonial.author}
          </p>
          <p className="text-xs uppercase tracking-[0.28em] text-neutral-300/80 break-words [overflow-wrap:anywhere]">
            {testimonial.role}
          </p>
          {testimonial.institution && (
            <p className="mt-1 text-xs text-neutral-300/70 break-words [overflow-wrap:anywhere]">
              {testimonial.institution}
            </p>
          )}
        </div>
        <span className="h-3 w-3 shrink-0 rounded-full bg-[#d1a157] shadow-[0_0_16px_rgba(209,161,87,0.5)]" />
      </footer>
    </article>
  );
};

export default TestimonialCard;
