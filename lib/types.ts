import type { PanelTone } from "clico-ds";

export type AgeStage = {
  id: string;
  label: string; // "8 months"
  short: string; // "8m"
  minMonths: number;
  tone: PanelTone; // clico surface tone for this stage
  blurb: string;
};

export type Recipe = {
  id: string;
  title: string;
  emoji: string;
  minMonths: number; // earliest age this is suitable for
  maxMonths: number; // latest age it's still age-appropriate (99 = no upper bound)
  prepMins: number;
  servings: string;
  texture: string;
  tags: string[];
  ingredients: string[];
  steps: string[];
  tip?: string;
  source: { name: string; url: string };
};
