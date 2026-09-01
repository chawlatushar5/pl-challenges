import { Router } from "express";

export const usersRouter = Router();

usersRouter.get("/me", (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "Unauthorized" });
  res.json({ id: "u1", email: "user@example.com" });
});
