import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  // 개발 환경에서는 localhost, 프로덕션에서는 EC2 서버 사용
  const apiTarget = mode === 'development'
    ? 'http://localhost:3001'
    : 'http://ec2-43-201-95-227.ap-northeast-2.compute.amazonaws.com:3001';

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
    server: {
      proxy: {
        "/api": {
          target: apiTarget,
          changeOrigin: true,
          secure: false,
        },
      },
      fs: {
        strict: false,
      },
      host: true,
      port: 3000,
      allowedHosts: [
        "ec2-43-201-95-227.ap-northeast-2.compute.amazonaws.com",
        "localhost",
        "127.0.0.1",
      ],
    },
  };
});
