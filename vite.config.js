import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  assetsInclude: ['**/*.JPG', '**/*.jpg', '**/*.png', '**/*.svg'],
  build: {
    cssMinify: "esbuild",
    outDir: 'dist',
  },
});
