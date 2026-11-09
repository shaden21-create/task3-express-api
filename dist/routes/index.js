"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = __importDefault(require("./user.routes"));
const requireAPIKey_1 = require("../middleware/requireAPIKey");
const router = (0, express_1.Router)();
// Public
router.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok", uptime: process.uptime() });
});
// Protected (bonus: API key required)
router.use("/users", requireAPIKey_1.requireAPIKey, user_routes_1.default);
exports.default = router;
