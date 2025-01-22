import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import replace from "@rollup/plugin-replace";
import path, { resolve } from "path";
import { existsSync } from "fs";

const loadLocales = (locale: string) => {
  const filePath = path.resolve(__dirname, `./dist/i18n.${locale}.json`);
  const content = existsSync(filePath)
    ? JSON.stringify(require(filePath)).replace(/"/g, '\\"')
    : "{}";
  return content;
};

/**
 * config for all lang import
 */
// export default defineConfig(({ mode }) => ({
//   root: resolve(__dirname, "./client"),
//   plugins: [react()],
//   build: {
//     outDir: resolve(__dirname, "./dist/client"),
//     // generate .vite/manifest.json in outDir
//     manifest: true,
//     rollupOptions: {
//       // overwrite default .html entry
//       input: "/src/main.tsx",
//     },
//   },
// }));

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  root: resolve(__dirname, "./client"),
  plugins: [react()],
  build: {
    outDir: resolve(__dirname, "./dist/client"),
    manifest: `.vite/manifest.${mode}.json`,
    rollupOptions: {
      // overwrite default .html entry
      input: "/src/main.tsx",
      output: {
        entryFileNames: `assets/[name]-${mode}-[hash].js`,
        plugins: [
          replace({
            __buildI18nJson: loadLocales(mode),
          }),
        ],
      },
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
}));
