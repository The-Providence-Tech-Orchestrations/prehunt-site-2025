import { defineCollection, z } from "astro:content";

const puzzleCollection = defineCollection({
  type: "content",
  // Frontmatter Validation
  schema: z.object({
    title: z.string(),
    round: z.number(),
    order: z.number(),
    answer: z.string(),
    keep_going: z.record(z.string(), z.string()),
    difficulty: z.enum(["expert", "casual"])
  }),
});

export const collections = {
  puzzle: puzzleCollection,
};
