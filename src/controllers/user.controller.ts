import { Request, Response } from "express";
import { userService } from "../services/user.service";

const parseId = (req: Request): number => Number(req.params.id);

export const userController = {
  getAll(_req: Request, res: Response): void {
    res.status(200).json(userService.getAll());
  },

  getById(req: Request, res: Response): void {
    const id = parseId(req);
    if (Number.isNaN(id)) {
      res.status(400).json({ error: "Invalid user id" });
      return;
    }
    const user = userService.getById(id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json(user);
  },

  create(req: Request, res: Response): void {
    const { name, email } = req.body ?? {};
    if (typeof name !== "string" || typeof email !== "string" || !name || !email) {
      res.status(400).json({ error: "Fields 'name' and 'email' are required strings" });
      return;
    }
    res.status(201).json(userService.create({ name, email }));
  },

  update(req: Request, res: Response): void {
    const id = parseId(req);
    if (Number.isNaN(id)) {
      res.status(400).json({ error: "Invalid user id" });
      return;
    }
    const { name, email } = req.body ?? {};
    if (
      (name !== undefined && typeof name !== "string") ||
      (email !== undefined && typeof email !== "string")
    ) {
      res.status(400).json({ error: "'name' and 'email' must be strings" });
      return;
    }
    const updated = userService.update(id, { name, email });
    if (!updated) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json(updated);
  },

  remove(req: Request, res: Response): void {
    const id = parseId(req);
    if (Number.isNaN(id)) {
      res.status(400).json({ error: "Invalid user id" });
      return;
    }
    if (!userService.remove(id)) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(204).send();
  },
};
