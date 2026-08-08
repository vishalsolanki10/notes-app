import { Router } from "express";

import { getTags } from "../controllers/notes.controller";

const router = Router();

router.get("/", getTags);

export default router;