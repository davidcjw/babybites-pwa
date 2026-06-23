"use client";

import Link from "next/link";
import { Button, type PanelTone } from "clico-ds";
import { RecipeCard } from "@/components/RecipeCard";
import { RECIPES } from "@/lib/recipes";
import { useFavorites } from "@/lib/useFavorites";

const TONES: PanelTone[] = ["mint", "butter", "peach", "lilac", "surface"];

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const recipes = RECIPES.filter((r) => favorites.includes(r.id));

  return (
    <div className="page">
      <h1 className="h1">Saved recipes</h1>
      <p className="sub">
        {recipes.length
          ? `${recipes.length} saved recipe${recipes.length === 1 ? "" : "s"}`
          : "Tap the ♡ on any recipe to keep it here."}
      </p>

      {recipes.length ? (
        <div className="card-list">
          {recipes.map((r, i) => (
            <RecipeCard key={r.id} recipe={r} tone={TONES[i % TONES.length]} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <span className="empty__emoji" aria-hidden>
            🥄
          </span>
          <p className="empty__text">No saved recipes yet.</p>
          <Button as={Link} href="/browse">
            Browse recipes
          </Button>
        </div>
      )}
    </div>
  );
}
