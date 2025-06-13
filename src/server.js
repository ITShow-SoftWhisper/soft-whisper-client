import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import shareRouter from "./routes/share.js";
import resultRouter from "./routes/result.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://ec2-43-201-95-227.ap-northeast-2.compute.amazonaws.com:3000",
    ],
  })
);

app.use(express.json());

app.use("/api", shareRouter);
app.use("/api", resultRouter);

app.listen(3000, () => {
  console.log("서버 실행 중: http://localhost:3000");
});
