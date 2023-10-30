import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "pnbsh9",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  // viewportWidths: {
  //   mobile: 320,
  //   tablet: 768,
  //   laptop: 1024,
  // },
});
