import initSqlJs, { Database } from "sql.js";

// In-memory SQL database (sql.js — SQLite compiled to WASM, no server
// process needed). Standing in for the real customer-data warehouse this
// internal tool queries in production; the SQL surface is real, so a query
// built by unsafe string concatenation here is exploitable the same way it
// would be against a real Postgres/MySQL instance.
let dbPromise: Promise<Database> | null = null;

export function getDb(): Promise<Database> {
  if (!dbPromise) {
    dbPromise = initSqlJs().then((SQL) => {
      const db = new SQL.Database();
      db.run(`
        CREATE TABLE customers (
          id INTEGER PRIMARY KEY,
          email TEXT NOT NULL,
          plan_tier TEXT NOT NULL,
          company TEXT NOT NULL
        );
      `);
      const seed: [number, string, string, string][] = [
        [1, "amy@acme.example", "enterprise", "Acme Corp"],
        [2, "ben@globex.example", "pro", "Globex Inc"],
        [3, "cara@initech.example", "free", "Initech"],
        [4, "dev@hooli.example", "enterprise", "Hooli"],
        [5, "erin@umbrella.example", "pro", "Umbrella LLC"],
      ];
      for (const [id, email, planTier, company] of seed) {
        db.run("INSERT INTO customers (id, email, plan_tier, company) VALUES (?, ?, ?, ?)", [
          id,
          email,
          planTier,
          company,
        ]);
      }
      return db;
    });
  }
  return dbPromise;
}
