import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import dts from "vite-plugin-dts";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin(),
    dts({
      include: ["src", "../tokens/src"],
      exclude: ["src/**/*.stories.tsx", "src/**/*.test.tsx", "src/test/**"],
      copyDtsFiles: true,
    })
  ],
  resolve: {
    alias: {
      "@lds/tokens": resolve(__dirname, "../tokens/src")
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es"],
      fileName: "index"
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime", "@tanstack/react-table"]
    }
  }
});
