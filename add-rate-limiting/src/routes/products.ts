import { Router } from "express";

export const productsRouter = Router();

const products = [
  { id: "1", name: "Widget A", price: 9.99 },
  { id: "2", name: "Widget B", price: 19.99 },
  { id: "3", name: "Widget C", price: 4.99 },
];

productsRouter.get("/", (_req, res) => res.json(products));
productsRouter.get("/:id", (req, res) => {
  const p = products.find((p) => p.id === req.params.id);
  if (!p) return res.status(404).json({ error: "Not found" });
  res.json(p);
});
