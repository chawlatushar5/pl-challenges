import express from "express";
import { ordersRouter } from "./routes/orders";
import { customersRouter } from "./routes/customers";
import { reportsRouter } from "./routes/reports";

export const app = express();

app.use(express.json());
app.use("/api/orders", ordersRouter);
app.use("/api/customers", customersRouter);
app.use("/api/reports", reportsRouter);
app.get("/health", (_req, res) => res.json({ status: "ok" }));
