import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getHeaderOffset() {
  if (typeof window === "undefined") return 96

  const header = document.querySelector("header")

  if (header instanceof HTMLElement) {
    return header.offsetHeight + 24
  }

  return 96
}

export function scrollToElementWithOffset(
  element: HTMLElement,
  options: ScrollToOptions = {},
) {
  if (typeof window === "undefined") return

  const top =
    element.getBoundingClientRect().top + window.scrollY - getHeaderOffset()

  window.scrollTo({
    top: Math.max(top, 0),
    behavior: "smooth",
    ...options,
  })
}
