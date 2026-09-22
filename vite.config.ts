import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  publicDir: "public",

  base: "/flores-amarillas/",

  build: {
    outDir: "dist",
    target: "es2020",
  },
});