import { db } from "../db/database";
import { Note } from "../types/note";

export const getAllNotes = () => {
  const notes = db
    .prepare(
      `
      SELECT *
      FROM notes
      ORDER BY updatedAt DESC
    `
    )
    .all();

  return notes.map((note: any) => ({
    ...note,
    tags: JSON.parse(note.tags || "[]"),
  }));
};

export const getNoteById = (
  id: string
): Note | null => {
  const note = db
    .prepare(
      `
      SELECT *
      FROM notes
      WHERE id = ?
    `
    )
    .get(id);

  if (!note) {
    return null;
  }

  return {
    ...note,
    tags: JSON.parse((note as any).tags || "[]"),
  }  as Note;
};

export const createNote = (note: any) => {
  return db
    .prepare(
      `
      INSERT INTO notes
      (
        id,
        title,
        content,
        tags,
        createdAt,
        updatedAt
      )
      VALUES
      (
        @id,
        @title,
        @content,
        @tags,
        @createdAt,
        @updatedAt
      )
    `
    )
    .run(note);
};

export const updateNote = (note: any) => {
  return db
    .prepare(
      `
      UPDATE notes
      SET
        title = @title,
        content = @content,
        tags = @tags,
        updatedAt = @updatedAt
      WHERE id = @id
    `
    )
    .run(note);
};

export const deleteNote = (id: string) => {
  return db
    .prepare(
      `
      DELETE FROM notes
      WHERE id = ?
    `
    )
    .run(id);
};