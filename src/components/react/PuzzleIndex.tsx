import { PuzzleDifficulty, type PuzzlePacket } from "@/lib/types";
import { useLocalStorage } from "@uidotdev/usehooks";
import type { CollectionEntry } from "astro:content";
import PuzzleIndexItem from "./PuzzleIndexItem";
import { filterPuzzleCollection } from "@/lib/utils";

interface PuzzleIndexProps {
  puzzles: CollectionEntry<"puzzle">[];
  packet?: PuzzlePacket;
}

function PuzzleIndex({puzzles, packet} :  PuzzleIndexProps) {
  const [isExpert, setisExpert] = useLocalStorage("puzzle-mode", true);
  const difficulty: PuzzleDifficulty = isExpert ? PuzzleDifficulty.Casual : PuzzleDifficulty.Expert;
  const puzzlesRendered = packet ? filterPuzzleCollection(puzzles, difficulty, packet) : filterPuzzleCollection(puzzles, difficulty);

  return (
    <ul>
      {
      puzzlesRendered.map((puzzle: any) => {
        return (
          <li>
            <PuzzleIndexItem puzzle={puzzle} />
          </li>
        );
      })
      }
    </ul>
  );
}

export default PuzzleIndex;





