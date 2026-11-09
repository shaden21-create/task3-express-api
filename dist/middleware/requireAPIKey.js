"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAPIKey = void 0;
const API_KEY = process.env.API_KEY ?? "secret-key-123";
/** Rejects requests without a valid `x-api-key` header using a 401 JSON payload. */
const requireAPIKey = (req, res, next) => {
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
exports.requireAPIKey = requireAPIKey;
