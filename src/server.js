import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import shareRouter from "./routes/share.js";
import resultRouter from "./routes/result.js";

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        /^http:\/\/localhost(:\d+)?$/,
        /^http:\/\/192\.168\.1\.174(:\d+)?$/,
        /^http:\/\/ec2-43-201-95-227\.ap-northeast-2\.compute\.amazonaws\.com(:\d+)?$/,
      ];

      if (!origin || allowedOrigins.some((regex) => regex.test(origin))) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json());

app.use("/api", shareRouter);
app.use("/api", resultRouter);

app.listen(3000, () => {
  console.log("서버 실행 중: http://localhost:3000");
});
