import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { defineConfig, envField } from "astro/config";

const ARCHIVE_MODE = process.env.ARCHIVE_MODE === "true";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), mdx(), icon(), sitemap()],
  site: ARCHIVE_MODE ? "https://puzzles.mit.edu/2025/heist/" : "https://www.mitmysteryheist.com",
  base: ARCHIVE_MODE ? "/2025/heist/" : "/",
  experimental: {
    env: {
      schema: {
        ARCHIVE_MODE: envField.boolean({
          context: "client",
          access: "public",
          optional: true,
          default: false,
        }),
      },
    },
  },
});