import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  root: resolve(__dirname, "./client"),
  plugins: [react()],
  build: {
    outDir: resolve(__dirname, "./dist"),
  },
});
