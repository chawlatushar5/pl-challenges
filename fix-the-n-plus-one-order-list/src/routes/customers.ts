import { Router } from "express";

// Unrelated endpoint — plain in-memory array, no DB access at all. Not the
// file with the bug.
export const customersRouter = Router();

const customers = [
  { id: 1, name: "Amy Chen" },
  { id: 2, name: "Ben Ortiz" },
];

customersRouter.get("/", (_req, res) => res.json(customers));
