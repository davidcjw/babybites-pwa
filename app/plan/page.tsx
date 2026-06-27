"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "clico-ds";
import { AgeFilter } from "@/components/AgeFilter";
import { RecipePreview } from "@/components/RecipePreview";
import { buildGroceryList } from "@/lib/grocery";
import { ageBandLabel, recipeById, recipesForAge } from "@/lib/recipes";
import { useAgeStage } from "@/lib/useAgeStage";
import { usePlan } from "@/lib/usePlan";

export default function PlanPage() {
  const { stageId, stage, select } = useAgeStage();
  const { plan, inPlan, toggle, remove, clear, count } = usePlan();
  const [previewId, setPreviewId] = useState<string | null>(null);
  const previewRecipe = previewId ? recipeById(previewId) : undefined;

  // Planned recipes, in the order they were added.
  const planned = plan.map(recipeById).filter((r) => r !== undefined);
  const grocery = buildGroceryList(planned);
  const itemCount = grocery.reduce((n, s) => n + s.items.length, 0);

  const picker = recipesForAge(stage.minMonths);

  return (
    <div className="page">
      <h1 className="h1">This week&apos;s plan</h1>
      <p className="sub">
        {count
          ? `${count} recipe${count === 1 ? "" : "s"} · ${itemCount} item${itemCount === 1 ? "" : "s"} to buy`
          : "Add recipes below to build a shared shopping list."}
      </p>

      {planned.length > 0 && (
        <section className="plan-section">
          <div className="plan-section__head">
            <p className="section-label">YOUR PLAN</p>
            <button type="button" className="plan-clear" onClick={clear}>
              Clear all
            </button>
          </div>
          <ul className="plan-list">
            {planned.map((r) => (
              <li key={r.id} className="plan-row">
                <Link href={`/recipe/${r.id}`} className="plan-row__link">
                  <span className="plan-row__emoji" aria-hidden>
                    {r.emoji}
                  </span>
                  <span className="plan-row__title">{r.title}</span>
                </Link>
                <button
                  type="button"
                  className="plan-row__remove"
                  onClick={() => remove(r.id)}
                  aria-label={`Remove ${r.title} from plan`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {grocery.length > 0 && (
        <section className="plan-section">
          <p className="section-label">GROCERY LIST</p>
          {grocery.map((s) => (
            <div key={s.aisle} className="grocery-aisle">
              <h3 className="grocery-aisle__name">{s.aisle}</h3>
              <ul className="grocery-items">
                {s.items.map((it) => (
                  <li key={it.name} className="grocery-item">
                    <span className="grocery-item__dot" aria-hidden />
                    {it.name}
                    {it.recipes.length > 1 && (
                      <span className="grocery-item__count"> ·{it.recipes.length}×</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p className="disclaimer">
            Items are deduped and grouped by aisle, but quantities aren&apos;t added
            up — check amounts against each recipe. “·2×” means it&apos;s used in 2
            planned recipes.
          </p>
        </section>
      )}

      <section className="plan-section">
        <p className="section-label">ADD RECIPES FOR {stage.short.toUpperCase()}</p>
        <AgeFilter selected={stageId} onSelect={select} />
        <ul className="plan-list">
          {picker.map((r) => {
            const added = inPlan(r.id);
            return (
              <li key={r.id} className="plan-row">
                <button
                  type="button"
                  className="plan-row__preview"
                  onClick={() => setPreviewId(r.id)}
                  aria-label={`Preview ${r.title}`}
                >
                  <span className="plan-row__emoji" aria-hidden>
                    {r.emoji}
                  </span>
                  <div className="plan-row__body">
                    <span className="plan-row__title">{r.title}</span>
                    <Badge tone="mint" mono>
                      {ageBandLabel(r)}
                    </Badge>
                  </div>
                </button>
                <button
                  type="button"
                  className={`plan-add${added ? " plan-add--on" : ""}`}
                  onClick={() => toggle(r.id)}
                  aria-pressed={added}
                  aria-label={added ? `Remove ${r.title} from plan` : `Add ${r.title} to plan`}
                >
                  {added ? "✓ Added" : "+ Add"}
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {previewRecipe && (
        <RecipePreview
          recipe={previewRecipe}
          added={inPlan(previewRecipe.id)}
          onToggle={() => toggle(previewRecipe.id)}
          onClose={() => setPreviewId(null)}
        />
      )}
    </div>
  );
}
