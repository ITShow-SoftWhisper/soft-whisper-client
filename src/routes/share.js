import express from "express";
import { v4 as uuidv4 } from "uuid";
import db from "../db/sharedResult.js";
import { sendMail } from "../utils/mailer.js";

const router = express.Router();

// Base URL을 환경변수에서 가져오거나 요청에서 추출
function getBaseUrl(req) {
  // 환경변수로 설정된 BASE_URL이 있으면 우선 사용
  if (process.env.BASE_URL) {
    return process.env.BASE_URL;
  }

  // Reverse proxy 환경을 고려한 URL 생성
  const protocol = req.get('X-Forwarded-Proto') || req.protocol;
  const host = req.get('X-Forwarded-Host') || req.get('host');

  // Origin 헤더가 있으면 그것을 사용, 없으면 protocol+host 조합
  return req.get("origin") || `${protocol}://${host}`;
}

router.post("/share", async (req, res) => {
  const { email, result } = req.body;
  const id = uuidv4().slice(0, 8);

  const baseUrl = getBaseUrl(req);
  const shareUrl = `${baseUrl}/result/${id}`;

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
