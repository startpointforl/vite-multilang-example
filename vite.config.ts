import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  root: resolve(__dirname, "./client"),
  plugins: [react()],
  build: {
    outDir: resolve(__dirname, "./dist/client"),
    // generate .vite/manifest.json in outDir
    manifest: true,
    rollupOptions: {
      // overwrite default .html entry
      input: "/src/main.tsx",
    },
  },
  server: {
    origin: "http://vite.example.ru:5173",
    host: "vite.example.ru",
    cors: {
      origin: "http://vite.example.ru",
      methods: ["GET", "HEAD"],
    },
  },
});
