import { Request, Response } from "express";
import { v4 as uuid } from "uuid";

import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from "../services/notes.service";

import {
  createNoteSchema,
  updateNoteSchema,
} from "../validation/notes.validation";

export const getNotes = (
  req: Request,
  res: Response
) => {
  const notes = getAllNotes();

  res.status(200).json({
    success: true,
    data: notes,
  });
};

export const getSingleNote = (
  req: Request,
  res: Response
) => {
  const note = getNoteById(String(req.params.id));

  if (!note) {
    return res.status(404).json({
      success: false,
      message: "Note not found",
    });
  }

  res.status(200).json({
    success: true,
    data: note,
  });
};

export const createNewNote = (
  req: Request,
  res: Response
) => {
  const parsed = createNoteSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: parsed.error.issues[0].message,
    });
  }

  const now = new Date().toISOString();

  const note = {
    id: uuid(),
    title: parsed.data.title,
    content: parsed.data.content,
    tags: JSON.stringify(parsed.data.tags),
    createdAt: now,
    updatedAt: now,
  };

  createNote(note);

  res.status(201).json({
    success: true,
    message: "Note created successfully",
    data: {
      ...note,
      tags: parsed.data.tags,
    },
  });
};

export const updateExistingNote = (
  req: Request,
  res: Response
) => {
  const existing = getNoteById(String(req.params.id));

  if (!existing) {
    return res.status(404).json({
      success: false,
      message: "Note not found",
    });
  }

  const parsed = updateNoteSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: parsed.error.issues[0].message,
    });
  }

  const updated = {
    id: existing.id,

    title: parsed.data.title ?? existing.title,

    content: parsed.data.content ?? existing.content,

    tags: JSON.stringify(
      parsed.data.tags ?? existing.tags
    ),

    createdAt: existing.createdAt,

    updatedAt: new Date().toISOString(),
  };

  updateNote(updated);

  res.status(200).json({
    success: true,
    message: "Note updated successfully",
  });
};

export const removeNote = (
  req: Request,
  res: Response
) => {
  const existing = getNoteById(String(req.params.id));

  if (!existing) {
    return res.status(404).json({
      success: false,
      message: "Note not found",
    });
  }

  deleteNote(String(req.params.id));

  res.status(200).json({
    success: true,
    message: "Note deleted successfully",
  });
};