import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "./docs",
  },
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg"],
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,woff2}"],
      },
      manifest: {
        background_color: "#000000",
        theme_color: "#7E1F86",
        name: "Portfolio-Tracker",
        short_name: "Pracker",
        start_url: "/Portfolio-Tracker/",
        display: "standalone",
        icons: [
          {
            src: "portfolio2x.png",
            sizes: "256x256",
            type: "image/png",
            purpose: "any",
          },
        ],
      },
    }),
  ],
  server: {
    port: 8080,
    host: true,
    hmr: {
      host: "localhost",
    },
  },
  base: "./",
});
