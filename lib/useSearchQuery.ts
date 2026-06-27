"use client";

import { useSyncExternalStore } from "react";

const KEY = "babybites.browseQuery";

// Module-level store so the ingredient search survives leaving /browse for a
// recipe and coming back. Mirrors lib/useFavorites.ts — no setState-in-effect
// (lint rule forbids it). sessionStorage so the query clears on tab close.
let current: string | null = null;
const EMPTY = ""; // stable reference for the server snapshot
const listeners = new Set<() => void>();

function read(): string {
  if (current !== null) return current;
  let value = EMPTY;
  try {
    value = window.sessionStorage.getItem(KEY) ?? EMPTY;
  } catch {
    /* ignore (private mode / SSR) */
  }
  current = value;
  return value;
}

function persist(next: string) {
  current = next;
  try {
    window.sessionStorage.setItem(KEY, next);
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

/** Shared, persisted ingredient search query for /browse. */
export function useSearchQuery() {
  const query = useSyncExternalStore(
    subscribe,
    read, // client snapshot (stable ref until changed)
    () => EMPTY, // server snapshot
  );

  return { query, setQuery: persist, clear: () => persist(EMPTY) };
}
