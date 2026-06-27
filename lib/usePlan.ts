"use client";

import { useSyncExternalStore } from "react";

const KEY = "babybites.plan";

// Module-level store so every page shares one persisted weekly meal plan.
// Mirrors lib/useFavorites.ts — no setState-in-effect (lint rule forbids it).
let current: string[] | null = null;
const EMPTY: string[] = []; // stable reference for the server snapshot
const listeners = new Set<() => void>();

function read(): string[] {
  if (current !== null) return current;
  let value: string[] = EMPTY;
  try {
    const saved = window.localStorage.getItem(KEY);
    if (saved) {
      const parsed: unknown = JSON.parse(saved);
      if (Array.isArray(parsed)) value = parsed.filter((x): x is string => typeof x === "string");
    }
  } catch {
    /* ignore (private mode / SSR) */
  }
  current = value;
  return value;
}

function persist(next: string[]) {
  current = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

/** Shared, persisted list of recipe ids planned for this week. */
export function usePlan() {
  const plan = useSyncExternalStore(
    subscribe,
    read, // client snapshot (stable ref until changed)
    () => EMPTY, // server snapshot
  );

  const inPlan = (id: string) => plan.includes(id);

  const toggle = (id: string) => {
    const list = read();
    persist(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
  };

  const remove = (id: string) => {
    const list = read();
    if (list.includes(id)) persist(list.filter((x) => x !== id));
  };

  const clear = () => persist([]);

  return { plan, inPlan, toggle, remove, clear, count: plan.length };
}
