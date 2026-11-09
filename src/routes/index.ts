import { Router } from "express";
import userRoutes from "./user.routes";
import { requireAPIKey } from "../middleware/requireAPIKey";

const router = Router();

// Public
router.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", uptime: process.uptime() });
});

// Protected (bonus: API key required)
router.use("/users", requireAPIKey, userRoutes);

export default router;
