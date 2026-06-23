"use client";

import type { MouseEvent } from "react";
import { Button } from "clico-ds";
import { useFavorites } from "@/lib/useFavorites";

type FavoriteButtonProps = {
  id: string;
  /** "icon" = compact heart for cards; "labeled" = full clico button for detail. */
  variant?: "icon" | "labeled";
};

export function FavoriteButton({ id, variant = "icon" }: FavoriteButtonProps) {
  const { isFavorite, toggle } = useFavorites();
  const fav = isFavorite(id);

  const onClick = (e: MouseEvent) => {
    // Cards wrap the button next to a <Link>; never let it navigate.
    e.preventDefault();
    e.stopPropagation();
    toggle(id);
    if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(8);
  };

  if (variant === "labeled") {
    return (
      <Button
        variant={fav ? "primary" : "secondary"}
        icon={fav ? "♥" : "♡"}
        aria-pressed={fav}
        onClick={onClick}
      >
        {fav ? "Saved" : "Save recipe"}
      </Button>
    );
  }

  return (
    <button
      type="button"
      className="fav-btn fav-btn--card"
      aria-pressed={fav}
      aria-label={fav ? "Remove from saved recipes" : "Save recipe"}
      onClick={onClick}
    >
      <span aria-hidden>{fav ? "♥" : "♡"}</span>
    </button>
  );
}
