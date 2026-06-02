import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api/stats": {
        target: "https://stats.kowx712.cc",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/stats/, "/"),
      },
    },
  },
  build: {
    rolldownOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes("/node_modules/motion/")) return "motion";
          if (id.includes("/node_modules/animejs/")) return "animejs";
          if (
            id.includes("/node_modules/@lobehub/icons/") ||
            id.includes("/node_modules/lucide-react/") ||
            id.includes("/node_modules/simple-icons/")
          ) {
            return "icons";
          }
        },
      },
    },
  },
});
