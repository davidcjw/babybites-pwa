"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Badge } from "clico-ds";
import { ageBandLabel } from "@/lib/recipes";
import type { Recipe } from "@/lib/types";

/**
 * Bottom-sheet overlay that previews a recipe so the user can take a quick
 * glance before deciding to add it to the week's plan. Add/added toggle lives
 * inside the sheet; "View full recipe" links out to the detail page.
 */
export function RecipePreview({
  recipe,
  added,
  onToggle,
  onClose,
}: {
  recipe: Recipe;
  added: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  // Close on Escape and lock background scroll while open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="preview-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={`${recipe.title} preview`}
      onClick={onClose}
    >
      <div className="preview-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="preview-grip" aria-hidden />
        <button
          type="button"
          className="preview-close"
          onClick={onClose}
          aria-label="Close preview"
        >
          ×
        </button>

        <div className="preview-head">
          <span className="preview-emoji" aria-hidden>
            {recipe.emoji}
          </span>
          <div className="preview-headtext">
            <h2 className="preview-title">{recipe.title}</h2>
            <p className="preview-meta">
              {recipe.texture} · {recipe.prepMins} min · {recipe.servings}
            </p>
          </div>
        </div>

        <div className="preview-badges">
          <Badge tone="mint" mono>
            {ageBandLabel(recipe)}
          </Badge>
          {recipe.tags.map((t) => (
            <Badge key={t} tone="butter" mono>
              {t}
            </Badge>
          ))}
        </div>

        <div className="preview-body">
          <p className="section-label">INGREDIENTS</p>
          <ul className="ingredients">
            {recipe.ingredients.map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>

          <p className="section-label">HOW TO COOK</p>
          <ol className="steps">
            {recipe.steps.map((step, i) => (
              <li key={i}>
                <span className="steps__num">{i + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>

          {recipe.tip ? (
            <>
              <p className="section-label">TIP</p>
              <p className="preview-tip">{recipe.tip}</p>
            </>
          ) : null}
        </div>

        <div className="preview-actions">
          <button
            type="button"
            className={`plan-add preview-add${added ? " plan-add--on" : ""}`}
            onClick={onToggle}
            aria-pressed={added}
          >
            {added ? "✓ Added to plan" : "+ Add to plan"}
          </button>
          <Link
            href={`/recipe/${recipe.id}`}
            className="preview-full"
            onClick={onClose}
          >
            View full recipe →
          </Link>
        </div>
      </div>
    </div>
  );
}
