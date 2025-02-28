import { useLocalStorage } from "@uidotdev/usehooks";
import type { CollectionEntry } from "astro:content";

interface PuzzleIndexItemProps {
  puzzle: CollectionEntry<"puzzle">;
  isMeta: boolean;
}

function PuzzleIndexItem({ puzzle, isMeta }: PuzzleIndexItemProps) {
  const solution = localStorage.getItem(`2025_prehunt/${puzzle.slug}_solution`);

  return (
    <>
      <div>
        <span className={`font-bold text-left group-hover:underline`}>
          {isMeta && <span className="text-grey-900 blur-[0.5px]">META: </span>}
          {puzzle.data.title}
        </span>
      </div>
      {solution && solution != `""` && (
        <p className="text-green-700 font-bold font-mono text-right blur-[0.4px] group-hover:underline">
          {solution}
        </p>
      )}
    </>
  );
}

export default PuzzleIndexItem;
