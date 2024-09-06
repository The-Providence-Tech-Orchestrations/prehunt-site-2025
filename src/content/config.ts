import { z, defineCollection } from "astro:content";

const puzzleCollection = defineCollection({
  type: "content",
  // Frontmatter Validation
  schema: z.object({}),
});

export const collections = {
  puzzle: puzzleCollection,
};
