"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

type TestimonialPaginationProps = {
  page: number;
  totalPages: number;
  items: Array<number | string>;
  isLoading?: boolean;
  copy: {
    pageLabel: string;
    ofLabel: string;
    previousAriaLabel: string;
    nextAriaLabel: string;
  };
  onPrev: () => void;
  onNext: () => void;
  onPageChange: (page: number) => void;
};

const TestimonialPagination = ({
  page,
  totalPages,
  items,
  isLoading = false,
  copy,
  onPrev,
  onNext,
  onPageChange,
}: TestimonialPaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-3">
      <p className="text-xs uppercase tracking-[0.3em] text-neutral-300/65">
        {copy.pageLabel} {page} {copy.ofLabel} {totalPages}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={onPrev}
          disabled={page === 1 || isLoading}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-neutral-100 transition hover:bg-white/8 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label={copy.previousAriaLabel}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {items.map((item, index) =>
          item === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="flex h-9 w-9 items-center justify-center text-sm text-neutral-300/70"
            >
              ...
            </span>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() => onPageChange(Number(item))}
              disabled={isLoading}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold transition",
                page === item
                  ? "border-primary-100/60 bg-primary-100/18 text-white"
                  : "border-white/20 text-neutral-100 hover:bg-white/8 disabled:cursor-not-allowed disabled:opacity-50"
              )}
              aria-current={page === item ? "page" : undefined}
            >
              {item}
            </button>
          )
        )}

        <button
          type="button"
          onClick={onNext}
          disabled={page === totalPages || isLoading}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-neutral-100 transition hover:bg-white/8 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label={copy.nextAriaLabel}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default TestimonialPagination;
