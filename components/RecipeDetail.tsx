"use client";

import { Badge, Button, Panel } from "clico-ds";
import { ageBandLabel } from "@/lib/recipes";
import type { Recipe } from "@/lib/types";
import { FavoriteButton } from "./FavoriteButton";

export function RecipeDetail({ recipe }: { recipe: Recipe }) {
  return (
    <div className="page page--detail">
      <span className="detail__emoji" aria-hidden>
        {recipe.emoji}
      </span>
      <h1 className="detail__title">{recipe.title}</h1>
      <p className="detail__meta">
        {recipe.texture} · {recipe.prepMins} min · {recipe.servings}
      </p>

      <div className="detail__badges">
        <Badge tone="mint" mono>
          {ageBandLabel(recipe)}
        </Badge>
        {recipe.tags.map((t) => (
          <Badge key={t} tone="butter" mono>
            {t}
          </Badge>
        ))}
      </div>

      <div className="cta-row cta-row--left">
        <FavoriteButton id={recipe.id} variant="labeled" />
      </div>

      <Panel padding={20}>
        <p className="section-label">INGREDIENTS</p>
        <ul className="ingredients">
          {recipe.ingredients.map((ing, i) => (
            <li key={i}>{ing}</li>
          ))}
        </ul>
      </Panel>

      <Panel padding={20}>
        <p className="section-label">HOW TO COOK</p>
        <ol className="steps">
          {recipe.steps.map((step, i) => (
            <li key={i}>
              <span className="steps__num">{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </Panel>

      {recipe.tip ? (
        <Panel tone="butter" padding={20}>
          <p className="section-label">TIP</p>
          <p>{recipe.tip}</p>
        </Panel>
      ) : null}

      <div className="cta-row cta-row--left">
        <Button
          as="a"
          variant="secondary"
          icon="🔗"
          href={recipe.source.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Source: {recipe.source.name}
        </Button>
      </div>

      <p className="disclaimer">
        Always follow your paediatrician&apos;s guidance on allergens and
        choking-hazard textures. Cook eggs, fish and meat thoroughly and serve
        food just warm.
      </p>
    </div>
  );
}
