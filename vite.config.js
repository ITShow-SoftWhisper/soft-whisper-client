import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve("src"),
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
