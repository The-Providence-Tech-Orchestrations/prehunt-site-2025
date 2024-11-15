import { defineCollection, z } from "astro:content";

const puzzleCollection = defineCollection({
  type: "content",
  // Frontmatter Validation
  schema: z.object({
    title: z.string(),
    order: z.number().optional(),
    answer: z.string(),
    keep_going: z.record(z.string(), z.string())
  }),
});

export const collections = {
  packet1_casual: puzzleCollection,
  packet2_casual: puzzleCollection,
  packet1_expert: puzzleCollection,
  packet2_expert: puzzleCollection,
};
