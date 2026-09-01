import express from "express";
import { searchRouter } from "./routes/search";
import { productsRouter } from "./routes/products";
import { usersRouter } from "./routes/users";

export const app = express();

app.use(express.json());

app.use("/api/search", searchRouter);
app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);

app.get("/health", (_req, res) => res.json({ status: "ok" }));
