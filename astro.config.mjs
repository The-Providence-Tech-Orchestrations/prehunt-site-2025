import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), mdx(), icon()],
  site: 'https://the-providence-tech-orchestrations.github.io',
  base: 'prehunt-site-2025',
});