"use client";

import { AgeFilter } from "@/components/AgeFilter";
import { RecipeCard } from "@/components/RecipeCard";
import { recipesForAge, searchByIngredient } from "@/lib/recipes";
import { useAgeStage } from "@/lib/useAgeStage";
import { useSearchQuery } from "@/lib/useSearchQuery";
import type { PanelTone } from "clico-ds";

const TONES: PanelTone[] = ["mint", "butter", "peach", "lilac", "surface"];

export default function BrowsePage() {
  const { stageId, stage, select } = useAgeStage();
  const { query, setQuery, clear } = useSearchQuery();

  const ageRecipes = recipesForAge(stage.minMonths);
  const recipes = searchByIngredient(ageRecipes, query);
  const trimmed = query.trim();

  return (
    <div className="page">
      <h1 className="h1">All recipes</h1>
      <p className="sub">
        {trimmed
          ? `${recipes.length} ${recipes.length === 1 ? "recipe" : "recipes"} with “${trimmed}”`
          : `${recipes.length} ideas age-appropriate for ${stage.label.toLowerCase()}`}
      </p>

      <div className="browse-filter">
        <div className="search-field">
          <input
            type="search"
            className="search-input"
            placeholder="Search by ingredient — e.g. sweet potato"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search recipes by ingredient"
          />
          {trimmed && (
            <button
              type="button"
              className="search-clear"
              onClick={clear}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
        <AgeFilter selected={stageId} onSelect={select} />
      </div>

      {recipes.length === 0 ? (
        <p className="empty">
          No recipes with “{trimmed}” for {stage.label.toLowerCase()}. Try another
          ingredient or age.
        </p>
      ) : (
        <div className="card-list">
          {recipes.map((r, i) => (
            <RecipeCard key={r.id} recipe={r} tone={TONES[i % TONES.length]} />
          ))}
        </div>
      )}
    </div>
  );
}
