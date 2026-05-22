import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        // Split heavy vendors into their own chunks so the initial bundle
        // stays lean and each dependency loads on its own schedule.
        //
        // NOTE: this is a function (not an object map) on purpose. An object
        // `manualChunks` marks every listed chunk as part of the entry's
        // preload graph, so Three.js (~1.1 MB) was being <link rel=modulepreload>
        // -ed on the landing page even though only the lazy 3D routes use it.
        // The function form lets Rollup keep the Three.js chunk async-only, so
        // it is fetched exclusively when a 3D route is actually visited.
        manualChunks(id) {
          // Keep Vite's tiny module-preload helper out of the Three.js chunk.
          // If it lands there, the entry statically imports it and drags the
          // whole ~1 MB Three.js bundle onto every page. Pin it beside React,
          // which is part of the always-loaded entry graph anyway.
          if (id.includes("vite/preload-helper")) return "react";
          if (!id.includes("node_modules")) return undefined;
          if (
            id.includes("/three/") ||
            id.includes("@react-three/") ||
            id.includes("/three-stdlib/")
          ) {
            return "three";
          }
          if (id.includes("/gsap/")) return "gsap";
          if (
            id.includes("/react/") ||
            id.includes("/react-dom/") ||
            id.includes("/react-router") ||
            id.includes("/scheduler/")
          ) {
            return "react";
          }
          return undefined;
        },
      },
    },
  },
});
