import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), mdx(), icon(), sitemap()],
  site: "https://puzzles.mit.edu",
  base: "/2025/heist/"
});
