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
  const difficulty: PuzzleDifficulty = isExpert ? PuzzleDifficulty.Expert : PuzzleDifficulty.Casual;
  const puzzlesRendered = packet
    ? filterPuzzleCollection(puzzles, difficulty, packet)
    : filterPuzzleCollection(puzzles, difficulty);

  return (
    <div className="flex justify-center items-center">
      <ul className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl divide-y divide-gray-200">
        {puzzlesRendered.map((puzzle: any, index: number) => {
          const isLastItem = index === puzzlesRendered.length - 1;
          return (
            <a
              key={puzzle.slug}
              href={`/puzzles/${puzzle.slug}`}
              className={`flex group justify-between items-center py-4 ${
                isLastItem ? "font-bold text-gray-800" : ""
              }`}
            >
              <PuzzleIndexItem puzzle={puzzle} isMeta={isLastItem} />
            </a>
          );
        })}
      </ul>
    </div>
  );
}

export default PuzzleIndex;
