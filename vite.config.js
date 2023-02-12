import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        // https://rollupjs.org/configuration-options/#output-manualchunks
        manualChunks: (id) => {
          if (id.includes("node_modules")) return "vendor";
          if (id.includes("src/data/")) return "data";
        },
      },
    },
  },
});
