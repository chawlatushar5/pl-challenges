import { Router } from "express";
import { getDb } from "../db/database";

// A different report, already written efficiently with a single aggregate
// query — included for realism (this project has more than one file that
// touches the DB) and to show what a properly batched query looks like.
// Not the file with the bug.
export const reportsRouter = Router();

reportsRouter.get("/order-counts", async (_req, res) => {
  const db = await getDb();
  const stmt = db.prepare(
    "SELECT order_id, COUNT(*) AS item_count FROM order_items GROUP BY order_id"
  );
  const rows: { order_id: number; item_count: number }[] = [];
  while (stmt.step()) rows.push(stmt.getAsObject() as { order_id: number; item_count: number });
  stmt.free();
  res.json({ counts: rows });
});
