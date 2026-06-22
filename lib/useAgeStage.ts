"use client";

import { useSyncExternalStore } from "react";
import { STAGES } from "./recipes";

const KEY = "babybites.ageStage";
const DEFAULT = "8m";

// Module-level store so every page shares one persisted age selection.
let current: string | null = null;
const listeners = new Set<() => void>();

function read(): string {
  if (current !== null) return current;
  let value = DEFAULT;
  try {
    const saved = window.localStorage.getItem(KEY);
    if (saved && STAGES.some((s) => s.id === saved)) value = saved;
  } catch {
    /* ignore (private mode / SSR) */
  }
  current = value;
  return value;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

/** Shared, persisted age-stage selection (defaults to 8 months). */
export function useAgeStage() {
  const stageId = useSyncExternalStore(
    subscribe,
    read, // client snapshot
    () => DEFAULT, // server snapshot
  );

  const select = (id: string) => {
    current = id;
    try {
      window.localStorage.setItem(KEY, id);
    } catch {
      /* ignore */
    }
    listeners.forEach((l) => l());
  };

  const stage = STAGES.find((s) => s.id === stageId) ?? STAGES[0];
  return { stageId, stage, select };
}
