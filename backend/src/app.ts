import express from "express";
import cors from "cors";

import healthRoutes from "./routes/health.routes";
import notesRoutes from "./routes/notes.routes";
import tagsRoutes from "./routes/tags.routes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/tags", tagsRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use(errorHandler);

export default app;