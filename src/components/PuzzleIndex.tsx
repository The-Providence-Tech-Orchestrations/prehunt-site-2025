import { useLocalStorage } from "@uidotdev/usehooks";
import type { Collection } from "astro:content";

interface PuzzleIndexProps {
  casual_puzzles: CollectionEntry<'casual_puzzles'>[];
  expert_puzzles: CollectionEntry<''>[];
}

function PuzzleIndex({casual_puzzles, expert_puzzles} :  PuzzleIndexProps) {
  const [isCasual, setIsCasual] = useLocalStorage("puzzle-mode", true);
  const puzzles = casual_puzzles ? isCasual : expert_puzzles

  return (
    <ul>
      puzzles.map((puzzle: any) => {
        return (
          <li>
            <PuzzleIndexItem client:only="react" puzzle={puzzle} />
          </li>
        );
      })
    </ul>
  );
}

export default PuzzleIndex;





