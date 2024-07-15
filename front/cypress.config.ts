import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    specPattern: 'src/Unit_Test/*.cy.{js,jsx,ts,tsx}',
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },

  e2e: {
    baseUrl: 'http://localhost:5173',
  },
});