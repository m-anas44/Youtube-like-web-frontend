import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://pro-backend-production-2d96.up.railway.app/",
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
