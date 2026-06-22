"use client";

import { STAGES } from "@/lib/recipes";

type AgeFilterProps = {
  selected: string;
  onSelect: (stageId: string) => void;
};

/** Horizontal row of age-stage chips; the active one fills lime. */
export function AgeFilter({ selected, onSelect }: AgeFilterProps) {
  return (
    <div className="age-filter" role="tablist" aria-label="Baby's age">
      {STAGES.map((stage) => {
        const active = stage.id === selected;
        return (
          <button
            key={stage.id}
            type="button"
            role="tab"
            aria-selected={active}
            className={`age-chip${active ? " age-chip--active" : ""}`}
            onClick={() => onSelect(stage.id)}
          >
            {stage.short}
          </button>
        );
      })}
    </div>
  );
}
