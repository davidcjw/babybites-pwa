"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import { useFavorites } from "@/lib/useFavorites";
import { usePlan } from "@/lib/usePlan";

/** App shell: sticky header + bottom tab nav, wrapping each page. */
export function Chrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { count } = useFavorites();
  const { count: planCount } = usePlan();
  const isDetail = pathname.startsWith("/recipe/");
  const onBrowse = pathname === "/browse";
  const onHome = pathname === "/";
  const onFavorites = pathname === "/favorites";
  const onPlan = pathname === "/plan";

  return (
    <div className="shell">
      <header className="header">
        {isDetail ? (
          <button
            type="button"
            className="header__back"
            onClick={() => {
              // Return to wherever the user came from (Browse, Plan, Saved…),
              // falling back to home if the recipe was opened directly.
              if (window.history.length > 1) router.back();
              else router.push("/");
            }}
          >
            ← Back
          </button>
        ) : (
          <Link href="/" className="wordmark">
            Baby<span className="wordmark__serif">Bites</span> 🥄
          </Link>
        )}
      </header>

      <main className="content">{children}</main>

      {!isDetail && (
        <nav className="bottomnav">
          <Link href="/" className={`navitem${onHome ? " navitem--active" : ""}`}>
            <span className="navitem__icon" aria-hidden>
              🎲
            </span>
            Randomize
          </Link>
          <Link href="/browse" className={`navitem${onBrowse ? " navitem--active" : ""}`}>
            <span className="navitem__icon" aria-hidden>
              📖
            </span>
            Browse
          </Link>
          <Link href="/plan" className={`navitem${onPlan ? " navitem--active" : ""}`}>
            <span className="navitem__icon" aria-hidden>
              🗓️
            </span>
            Plan{planCount > 0 ? ` (${planCount})` : ""}
          </Link>
          <Link
            href="/favorites"
            className={`navitem${onFavorites ? " navitem--active" : ""}`}
          >
            <span className="navitem__icon" aria-hidden>
              ❤️
            </span>
            Saved{count > 0 ? ` (${count})` : ""}
          </Link>
        </nav>
      )}
    </div>
  );
}
