import { NextFunction, Request, Response } from "express";

const API_KEY = process.env.API_KEY ?? "secret-key-123";

/** Rejects requests without a valid `x-api-key` header using a 401 JSON payload. */
export const requireAPIKey = (req: Request, res: Response, next: NextFunction): void => {
  const key = req.header("x-api-key");
  if (!key || key !== API_KEY) {
    res.status(401).json({
      error: "Unauthorized",
      message: "Missing or invalid x-api-key header",
    });
    return;
  }
  next();
};
