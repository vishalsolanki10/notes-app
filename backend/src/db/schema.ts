import { db } from "./database";

export const initializeDatabase = () => {
  const createNotesTable = `
    CREATE TABLE IF NOT EXISTS notes (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      tags TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    )
  `;

  db.prepare(createNotesTable).run();

  console.log("✅ Notes table ready");
};