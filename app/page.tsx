import { client } from "@/lib/sanity.client";
import Link from "next/link";
import { ArrowRight, LayoutDashboard } from "lucide-react";

export const revalidate = 0;

export default async function GatewayPage() {
  let firstUser = null;
  try {
    firstUser = await client.fetch(`
      *[_type == "user" && !(_id in path('drafts.**'))][0]{
        name,
        slug
      }
    `);
  } catch (err) {
    console.error("Failed to fetch gateway users:", err);
  }

  const userSlug = firstUser?.slug?.current;
  const userName = firstUser?.name || "Portfolio Owner";

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[radial-gradient(circle_at_center,rgba(75,101,127,0.15),transparent_60%),linear-gradient(180deg,#1b2632_0%,#111923_100%)] p-6">
      <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-8 shadow-2xl space-y-6 text-center">
        <div className="space-y-2">
          <div className="mx-auto w-12 h-12 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-xl flex items-center justify-center font-oswald text-xl font-bold tracking-wider">
            PH
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight font-oswald">
            Portfolio Hub Gateway
          </h1>
          <p className="text-xs text-slate-400 font-inter">
            Welcome to the gateway. Select a portfolio to view.
          </p>
        </div>

        <div className="h-px bg-slate-800/60 my-4" />

        <div className="space-y-3">
          {userSlug ? (
            <Link
              href={`/${userSlug}`}
              className="flex items-center justify-between w-full px-5 py-4 bg-gradient-to-r from-teal-500/10 to-blue-500/10 hover:from-teal-500/15 hover:to-blue-500/15 border border-teal-500/25 hover:border-teal-500/40 text-teal-400 font-bold rounded-xl transition duration-300 group cursor-pointer text-sm font-inter"
            >
              <span>View {userName}&apos;s Portfolio</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <div className="px-5 py-4 bg-slate-950/60 border border-slate-800/60 text-slate-500 rounded-xl text-xs font-inter italic">
              No active profiles found in the database.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
