import { useLocalStorage } from "@uidotdev/usehooks";
import type { CollectionEntry } from "astro:content";

import { PuzzleDifficulty, type PuzzlePacket } from "@/lib/types";
import { filterPuzzleCollection } from "@/lib/utils";

import PuzzleIndexItem from "./PuzzleIndexItem";

interface PuzzleIndexProps {
  puzzles: CollectionEntry<"puzzle">[];
  packet?: PuzzlePacket;
}

function PuzzleIndex({ puzzles, packet }: PuzzleIndexProps) {
  const [isExpert, setisExpert] = useLocalStorage("puzzle-mode", true);
  const difficulty: PuzzleDifficulty = isExpert ? PuzzleDifficulty.Casual : PuzzleDifficulty.Expert;
  const puzzlesRendered = packet
    ? filterPuzzleCollection(puzzles, difficulty, packet)
    : filterPuzzleCollection(puzzles, difficulty);

  return (
    <ul>
      {puzzlesRendered.map((puzzle: any) => {
        return (
          <li className="flex gap-2">
            <PuzzleIndexItem puzzle={puzzle} />
            {localStorage.getItem(`${puzzle.slug}_solution`) && (
              <p>{localStorage.getItem(`${puzzle.slug}_solution`)}</p>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default PuzzleIndex;
