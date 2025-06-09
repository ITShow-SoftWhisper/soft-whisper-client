import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react()],
  // ✅ resolve는 최상위 레벨에 위치해야 함
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
    fs: {
      strict: false,
    },
    host: true,
    port: 3000,
    allowedHosts: ["ec2-43-201-95-227.ap-northeast-2.compute.amazonaws.com"],
  },
});
