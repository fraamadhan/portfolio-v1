"use client";

import { useEffect } from "react";

const VISITOR_SESSION_KEY = "portfolio-visitor-tracked";
const VISITOR_EVENT_NAME = "portfolio-visitor-updated";
const VISITOR_PENDING_VALUE = "pending";
const VISITOR_TRACKED_VALUE = "true";

export default function VisitorTracker() {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const emitVisitorEvent = (detail: { count?: number }) => {
      window.dispatchEvent(
        new CustomEvent(VISITOR_EVENT_NAME, {
          detail,
        }),
      );
    };

    const visitStatus = window.sessionStorage.getItem(VISITOR_SESSION_KEY);
    if (visitStatus === VISITOR_PENDING_VALUE || visitStatus === VISITOR_TRACKED_VALUE) {
      return;
    }

    window.sessionStorage.setItem(VISITOR_SESSION_KEY, VISITOR_PENDING_VALUE);

    const controller = new AbortController();

    const trackVisitor = async () => {
      try {
        const response = await fetch("/api/visitors", {
          method: "POST",
          signal: controller.signal,
        });

        if (!response.ok) {
          window.sessionStorage.removeItem(VISITOR_SESSION_KEY);
          return;
        }

        const payload = (await response.json()) as { count?: number };
        window.sessionStorage.setItem(VISITOR_SESSION_KEY, VISITOR_TRACKED_VALUE);
        emitVisitorEvent({
          count: payload.count,
        });
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          window.sessionStorage.removeItem(VISITOR_SESSION_KEY);
        }
      }
    };

    void trackVisitor();

    return () => controller.abort();
  }, []);

  return null;
}
