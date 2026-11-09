import express, { NextFunction, Request, Response } from "express";
import { observability } from "./middleware/observability";
import routes from "./routes";

const app = express();

app.use(observability); // global observability, runs first for every request
app.use(express.json());

app.use("/api", routes);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler (includes malformed JSON bodies)
app.use((err: Error & { status?: number }, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status ?? 500;
  res.status(status).json({ error: status === 400 ? "Invalid JSON payload" : "Internal Server Error" });
});

export default app;
