"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("../services/user.service");
const parseId = (req) => Number(req.params.id);
exports.userController = {
    getAll(_req, res) {
        res.status(200).json(user_service_1.userService.getAll());
    },
    getById(req, res) {
        const id = parseId(req);
        if (Number.isNaN(id)) {
            res.status(400).json({ error: "Invalid user id" });
            return;
        }
        const user = user_service_1.userService.getById(id);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.status(200).json(user);
    },
    create(req, res) {
        const { name, email } = req.body ?? {};
        if (typeof name !== "string" || typeof email !== "string" || !name || !email) {
            res.status(400).json({ error: "Fields 'name' and 'email' are required strings" });
            return;
        }
        res.status(201).json(user_service_1.userService.create({ name, email }));
    },
    update(req, res) {
        const id = parseId(req);
        if (Number.isNaN(id)) {
            res.status(400).json({ error: "Invalid user id" });
            return;
        }
        const { name, email } = req.body ?? {};
        if ((name !== undefined && typeof name !== "string") ||
            (email !== undefined && typeof email !== "string")) {
            res.status(400).json({ error: "'name' and 'email' must be strings" });
            return;
        }
        const updated = user_service_1.userService.update(id, { name, email });
        if (!updated) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.status(200).json(updated);
    },
    remove(req, res) {
        const id = parseId(req);
        if (Number.isNaN(id)) {
            res.status(400).json({ error: "Invalid user id" });
            return;
        }
        if (!user_service_1.userService.remove(id)) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.status(204).send();
    },
};
