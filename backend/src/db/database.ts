import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const dbDir = path.join(__dirname, "../../database");

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, "notes.db");

export const db = new Database(dbPath);

console.log("✅ SQLite connected");