import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./", // 👈 rất quan trọng để assets load đúng khi deploy
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
