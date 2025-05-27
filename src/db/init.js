import sqlite3 from "sqlite3";
import { open } from "sqlite";

const db = await open({
  filename: "./shared_results.sqlite",
  driver: sqlite3.Database,
});

await db.exec(`
  CREATE TABLE IF NOT EXISTS sharedResult (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL,
    result TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

console.log("SQLite 테이블 생성 완료");
await db.close();
