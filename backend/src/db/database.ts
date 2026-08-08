import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(__dirname, "../../database/notes.db");

export const db = new Database(dbPath);

console.log("✅ SQLite connected");