import { Router } from "express";

import {
  getNotes,
  getSingleNote,
  createNewNote,
  updateExistingNote,
  removeNote,
} from "../controllers/notes.controller";

const router = Router();

router.get("/", getNotes);

router.get("/:id", getSingleNote);

router.post("/", createNewNote);

router.patch("/:id", updateExistingNote);

router.delete("/:id", removeNote);

export default router;