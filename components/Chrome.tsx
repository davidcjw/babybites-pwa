"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

/** App shell: sticky header + bottom tab nav, wrapping each page. */
export function Chrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isDetail = pathname.startsWith("/recipe/");
  const onBrowse = pathname === "/browse";
  const onHome = pathname === "/";

  return (
    <div className="shell">
      <header className="header">
        {isDetail ? (
          <Link href="/" className="header__back">
            ← Back
          </Link>
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
            <span aria-hidden>🎲</span> Randomize
          </Link>
          <Link href="/browse" className={`navitem${onBrowse ? " navitem--active" : ""}`}>
            <span aria-hidden>📖</span> Browse
          </Link>
        </nav>
      )}
    </div>
  );
}
