"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ClientRedirectProps {
  to: string;
}

export default function ClientRedirect({ to }: ClientRedirectProps) {
  const router = useRouter();

  useEffect(() => {
    router.replace(to);
  }, [to, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-neutral-950">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
    </div>
  );
}
