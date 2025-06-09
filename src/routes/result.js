import express from "express";
import db from "@/db/sharedResult.js";

const router = express.Router();

router.get("/result/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const row = await db.get("SELECT * FROM sharedResult WHERE id = ?", [id]);
    if (!row) return res.status(404).send("결과 없음");

    const resultData = JSON.parse(row.result);
    res.json(resultData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "조회 실패" });
  }
});

export default router;
