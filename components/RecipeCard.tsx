"use client";

import Link from "next/link";
import { Badge, Panel, type PanelTone } from "clico-ds";
import { ageBandLabel } from "@/lib/recipes";
import type { Recipe } from "@/lib/types";
import { FavoriteButton } from "./FavoriteButton";

type RecipeCardProps = {
  recipe: Recipe;
  tone?: PanelTone;
};

/** Compact, tappable recipe card linking to the detail route. */
export function RecipeCard({ recipe, tone = "surface" }: RecipeCardProps) {
  return (
    <div className="card-wrap">
      <Link href={`/recipe/${recipe.id}`} className="card-link">
        <Panel tone={tone} interactive padding={16}>
          <div className="card">
            <span className="card__emoji" aria-hidden>
              {recipe.emoji}
            </span>
            <div className="card__body">
              <h3 className="card__title">{recipe.title}</h3>
              <p className="card__meta">
                {recipe.texture} · {recipe.prepMins} min
              </p>
              <div className="card__badges">
                <Badge tone="mint" mono>
                  {ageBandLabel(recipe)}
                </Badge>
                {recipe.tags[0] ? (
                  <Badge tone="butter" mono>
                    {recipe.tags[0]}
                  </Badge>
                ) : null}
              </div>
            </div>
          </div>
        </Panel>
      </Link>
      {/* Sibling of the Link (not nested) to keep valid, accessible markup. */}
      <FavoriteButton id={recipe.id} />
    </div>
  );
}
