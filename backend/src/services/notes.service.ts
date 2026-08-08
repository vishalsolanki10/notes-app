import { log } from "node:console";
import { db } from "../db/database";
import { Note } from "../types/note";
import { NoteQuery } from "../types/note-query";

export const getAllNotes = (
  query?: NoteQuery
) => {
  const notes = db
    .prepare(
      `
      SELECT *
      FROM notes
    `
    )
    .all();

  let result = notes.map((note: any) => ({
    ...note,
    tags: JSON.parse(note.tags || "[]"),
  }));

  // Search
  if (query?.search) {
    const search = query.search.toLowerCase();

    result = result.filter(
      (note: any) =>
        note.title
          .toLowerCase()
          .includes(search) ||
        note.content
          .toLowerCase()
          .includes(search)
    );
  }

  // Tag Filter
  if (query?.tag) {
    const tag = query.tag.toLowerCase();

    result = result.filter((note: any) =>
      note.tags.some(
        (t: string) =>
          t.toLowerCase() === tag
      )
    );
  }

  // Sort
  switch (query?.sort) {
    case "title":
      result.sort((a: any, b: any) =>
        a.title.localeCompare(b.title)
      );
      break;

    case "createdAt":
      result.sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      );
      break;

    case "updatedAt":
      result.sort(
        (a: any, b: any) =>
          new Date(b.updatedAt).getTime() -
          new Date(a.updatedAt).getTime()
      );
      break;

    default:
      result.sort(
        (a: any, b: any) =>
          new Date(b.updatedAt).getTime() -
          new Date(a.updatedAt).getTime()
      );
  }

  const page = query?.page || 1;
  const limit = query?.limit || 10;

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedData = result.slice(
    startIndex,
    endIndex
  );

  return {
    notes: paginatedData,
    total: result.length,
    page,
    limit,
    totalPages: Math.ceil(
    result.length / limit
    ),
  };
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

export const getAllTags = () => {
  const notes = db
    .prepare("SELECT tags FROM notes")
    .all();

  console.log(notes)
  const tagMap = new Map<
    string,
    number
  >();

  notes.forEach((note: any) => {
    const tags = JSON.parse(
      note.tags || "[]"
    );

    tags.forEach((tag: string) => {
      tagMap.set(
        tag,
        (tagMap.get(tag) || 0) + 1
      );
    });
  });

  return Array.from(
    tagMap.entries()
  ).map(([name, count]) => ({
    name,
    count,
  }));
};