import { Router } from "express";
import { getDb } from "../db/database";

export const customerLookupRouter = Router();

// TODO: this is the support desk's "look up a customer by email" tool — an
// agent on a call pastes in whatever email the customer gives them and
// this returns their account.
//
// Right now the query is built by concatenating that email straight into
// the SQL string. Fix it so a crafted email value can't change which rows
// the query matches or return rows it was never supposed to.
customerLookupRouter.get("/lookup", async (req, res) => {
  const email = req.query.email;
  if (typeof email !== "string" || !email) {
    return res.status(400).json({ error: "email is required" });
  }

  const db = await getDb();
  const sql = `SELECT id, email, plan_tier, company FROM customers WHERE email = '${email}'`;
  const stmt = db.prepare(sql);
  const results: Record<string, unknown>[] = [];
  while (stmt.step()) {
    results.push(stmt.getAsObject());
  }
  stmt.free();

  res.json({ customers: results });
});
