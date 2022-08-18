import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

export default defineConfig({
  integrations: [sitemap(), react()],
  site: "https://astro-theme-creek.netlify.app/",
});
