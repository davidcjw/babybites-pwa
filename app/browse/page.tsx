"use client";

import { AgeFilter } from "@/components/AgeFilter";
import { RecipeCard } from "@/components/RecipeCard";
import { recipesForAge } from "@/lib/recipes";
import { useAgeStage } from "@/lib/useAgeStage";
import type { PanelTone } from "clico-ds";

const TONES: PanelTone[] = ["mint", "butter", "peach", "lilac", "surface"];

export default function BrowsePage() {
  const { stageId, stage, select } = useAgeStage();
  const recipes = recipesForAge(stage.minMonths);

  return (
    <div className="page">
      <h1 className="h1">All recipes</h1>
      <p className="sub">
        {recipes.length} ideas age-appropriate for {stage.label.toLowerCase()}
      </p>

      <div className="browse-filter">
        <AgeFilter selected={stageId} onSelect={select} />
      </div>

      <div className="card-list">
        {recipes.map((r, i) => (
          <RecipeCard key={r.id} recipe={r} tone={TONES[i % TONES.length]} />
        ))}
      </div>
    </div>
  );
}
