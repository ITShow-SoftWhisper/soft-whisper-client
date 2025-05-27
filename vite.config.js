import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// SPA fallback을 위한 Vite 내장 설정
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
    // ✅ 이게 핵심: history fallback
    fs: {
      strict: false,
    },
  },
});
