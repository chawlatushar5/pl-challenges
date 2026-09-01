import express from "express";
import { customerLookupRouter } from "./routes/customerLookup";
import { productsRouter } from "./routes/products";
import { healthRouter } from "./routes/health";

export const app = express();

app.use(express.json());
app.use("/api/customers", customerLookupRouter);
app.use("/api/products", productsRouter);
app.use("/health", healthRouter);
