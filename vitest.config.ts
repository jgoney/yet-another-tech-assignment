/// <reference types="vitest/config" />

import { defineConfig, coverageConfigDefaults } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    coverage: {
      exclude: [
        "**/storybook-static/**",
        "**/*.stories.tsx",
        ...coverageConfigDefaults.exclude,
      ],
    },
  },
});
