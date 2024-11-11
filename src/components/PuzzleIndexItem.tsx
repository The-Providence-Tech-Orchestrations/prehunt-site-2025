import { useLocalStorage } from "@uidotdev/usehooks";
import type { CollectionEntry } from "astro:content";

interface PuzzleIndexItemProps {
  puzzle: CollectionEntry<"puzzle">;
}

function PuzzleIndexItem({ puzzle }: PuzzleIndexItemProps) {
  // TODO: Match this slug to the one in local storage
  const [solution, _] = useLocalStorage(puzzle.slug, "");

  return (
    <div>
      <a href={puzzle.slug} className="font-bold">
        {puzzle.data.title}
      </a>
      {solution && <p>{solution}</p>}
    </div>
  );
}

export default PuzzleIndexItem;
