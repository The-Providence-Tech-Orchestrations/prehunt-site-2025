import type { CollectionEntry } from "astro:content";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { PuzzleDifficulty, PuzzlePacket } from "./types";
import type { CollectionEntry } from "astro:content";

import type { PuzzleDifficulty, PuzzlePacket } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const HUNT_START_TIME: Date = new Date("2023-11-16T12:00:00-05:00");

export const HUNT_HAS_STARTED = (() => {
  return new Date() >= HUNT_START_TIME;
})();

export function filterPuzzleCollection(
  puzzles: CollectionEntry<"puzzle">[],
  difficulty: PuzzleDifficulty,
  packet?: PuzzlePacket,
) {
  return puzzles.filter(
    (puzzle) => puzzle.data.difficulty === difficulty && (!packet || puzzle.data.round === packet),
  );
}
