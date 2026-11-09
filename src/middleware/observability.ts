import { NextFunction, Request, Response } from "express";

/**
 * Global observability middleware.
 * Logs: ISO timestamp, HTTP method, URL path, and processing time in ms.
 * The log line is written when the response finishes, so the duration is accurate.
 */
export const observability = (req: Request, res: Response, next: NextFunction): void => {
  const timestamp = new Date().toISOString();
  const start = process.hrtime.bigint();

  res.on("finish", () => {
    const durationMs = Number(process.hrtime.bigint() - start) / 1e6;
    console.log(
      `[${timestamp}] ${req.method} ${req.originalUrl.split("?")[0]} ${res.statusCode} - ${durationMs.toFixed(2)}ms`
    );
  });

  next();
};
