"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const observability_1 = require("./middleware/observability");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use(observability_1.observability); // global observability, runs first for every request
app.use(express_1.default.json());
app.use("/api", routes_1.default);
// 404 handler
app.use((_req, res) => {
    res.status(404).json({ error: "Route not found" });
});
// Error handler (includes malformed JSON bodies)
app.use((err, _req, res, _next) => {
    const status = err.status ?? 500;
    res.status(status).json({ error: status === 400 ? "Invalid JSON payload" : "Internal Server Error" });
});
exports.default = app;
