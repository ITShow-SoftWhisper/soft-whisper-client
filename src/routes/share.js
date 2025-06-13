import express from "express";
import { v4 as uuidv4 } from "uuid";
import db from "../db/sharedResult.js";
import { sendMail } from "../utils/mailer.js";

const router = express.Router();

router.post("/share", async (req, res) => {
  const { email, result } = req.body;
  const id = uuidv4().slice(0, 8);

  // 요청 헤더의 Origin이 있으면 그걸, 없으면 protocol+host 조합을 사용
  const origin = req.get("origin") || `${req.protocol}://${req.get("host")}`;
  const shareUrl = `${origin}/result/${id}`;

  try {
    await db.run(
      "INSERT INTO sharedResult (id, email, result) VALUES (?, ?, ?)",
      [id, email, JSON.stringify(result)]
    );
    await sendMail(email, shareUrl);
    res.status(200).json({ id, shareUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "공유 실패" });
  }
});

export default router;
