"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.observability = void 0;
/**
 * Global observability middleware.
 * Logs: ISO timestamp, HTTP method, URL path, and processing time in ms.
 * The log line is written when the response finishes, so the duration is accurate.
 */
const observability = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const start = process.hrtime.bigint();
    res.on("finish", () => {
        const durationMs = Number(process.hrtime.bigint() - start) / 1e6;
        console.log(`[${timestamp}] ${req.method} ${req.originalUrl.split("?")[0]} ${res.statusCode} - ${durationMs.toFixed(2)}ms`);
    });
    next();
};
exports.observability = observability;
