import express from "express";
import { webhooksRouter } from "./routes/webhooks";

export const app = express();

app.use(express.json());
app.use("/webhooks", webhooksRouter);
app.get("/health", (_req, res) => res.json({ status: "ok" }));
