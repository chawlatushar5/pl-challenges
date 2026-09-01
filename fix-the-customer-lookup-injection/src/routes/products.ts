import { Router } from "express";

// Unrelated product catalog endpoint — plain in-memory array, no SQL
// involved. Not the file with the bug.
export const productsRouter = Router();

const products = [
  { id: "1", name: "Starter plan" },
  { id: "2", name: "Pro plan" },
  { id: "3", name: "Enterprise plan" },
];

productsRouter.get("/", (_req, res) => res.json(products));
