import { defineCollection, z } from "astro:content";

const puzzleCollection = defineCollection({
  type: "content",
  // Frontmatter Validation
  schema: z.object({
    title: z.string(),
    answer: z.string(),
    keep_going: z.record(z.string(), z.string())
  }),
});

export const collections = {
  puzzle: puzzleCollection,
};
