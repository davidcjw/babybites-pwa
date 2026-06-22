"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Badge, Button, DisplayHeading, Panel, SerifAccent } from "clico-ds";
import { AgeFilter } from "@/components/AgeFilter";
import { ageBandLabel, recipesForAge } from "@/lib/recipes";
import type { Recipe } from "@/lib/types";
import { useAgeStage } from "@/lib/useAgeStage";

function pickRandom(pool: Recipe[], avoidId?: string): Recipe | null {
  if (pool.length === 0) return null;
  if (pool.length === 1) return pool[0];
  let next = pool[Math.floor(Math.random() * pool.length)];
  let guard = 0;
  while (next.id === avoidId && guard < 8) {
    next = pool[Math.floor(Math.random() * pool.length)];
    guard += 1;
  }
  return next;
}

export default function HomePage() {
  const router = useRouter();
  const { stageId, stage, select } = useAgeStage();
  const pool = useMemo(() => recipesForAge(stage.minMonths), [stage.minMonths]);
  const [picked, setPicked] = useState<Recipe | null>(null);

  // Show a recipe immediately for the current pool (re-derives when age changes).
  const shown = picked && pool.some((r) => r.id === picked.id) ? picked : pool[0] ?? null;

  const handleAge = (id: string) => {
    select(id);
    setPicked(null);
  };

  const randomize = () => {
    setPicked(pickRandom(pool, shown?.id));
    if (navigator?.vibrate) navigator.vibrate(12);
  };

  return (
    <div className="page page--home">
      <p className="eyebrow">WHAT&apos;S FOR BABY?</p>
      <DisplayHeading>
        Cook something <SerifAccent>delicious</SerifAccent>
      </DisplayHeading>
      <p className="sub">{stage.blurb}</p>

      <p className="section-label">BABY&apos;S AGE</p>
      <AgeFilter selected={stageId} onSelect={handleAge} />

      {shown ? (
        <Link href={`/recipe/${shown.id}`} className="hero-link">
          <Panel tone={stage.tone} interactive padding={24}>
            <div className="hero">
              <span className="hero__emoji" aria-hidden>
                {shown.emoji}
              </span>
              <h2 className="hero__title">{shown.title}</h2>
              <p className="hero__meta">
                {shown.texture} · {shown.prepMins} min · {shown.servings}
              </p>
              <div className="hero__badges">
                <Badge tone="butter" mono>
                  {ageBandLabel(shown)}
                </Badge>
                {shown.tags.slice(0, 2).map((t) => (
                  <Badge key={t} tone="mint" mono>
                    {t}
                  </Badge>
                ))}
              </div>
              <span className="hero__hint">Tap for the full recipe →</span>
            </div>
          </Panel>
        </Link>
      ) : (
        <Panel padding={24}>
          <p>No recipes for this age yet.</p>
        </Panel>
      )}

      <div className="cta-row">
        <Button size="lg" icon="🎲" onClick={randomize}>
          Surprise me
        </Button>
      </div>

      <button
        type="button"
        className="browse-link"
        onClick={() => router.push("/browse")}
      >
        Browse all {pool.length} recipes →
      </button>
    </div>
  );
}
