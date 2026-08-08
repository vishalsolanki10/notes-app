import express from "express";
import cors from "cors";

import healthRoutes from "./routes/health.routes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);

app.use(errorHandler);

export default app;