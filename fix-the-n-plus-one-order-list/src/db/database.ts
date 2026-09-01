import initSqlJs, { Database } from "sql.js";

// In-memory SQL database (sql.js — SQLite compiled to WASM, no server
// process needed). Standing in for the real orders DB — the SQL surface is
// real, so query *count*, not just query correctness, is something a test
// can actually measure here.
let dbPromise: Promise<Database> | null = null;

export function getDb(): Promise<Database> {
  if (!dbPromise) {
    dbPromise = initSqlJs().then((SQL) => {
      const db = new SQL.Database();
      db.run(`
        CREATE TABLE orders (
          id INTEGER PRIMARY KEY,
          customer_name TEXT NOT NULL,
          placed_at TEXT NOT NULL
        );
        CREATE TABLE order_items (
          id INTEGER PRIMARY KEY,
          order_id INTEGER NOT NULL,
          sku TEXT NOT NULL,
          quantity INTEGER NOT NULL
        );
      `);

      const orders: [number, string, string][] = [
        [1, "Amy Chen", "2026-07-01"],
        [2, "Ben Ortiz", "2026-07-02"],
        [3, "Cara Singh", "2026-07-02"],
        [4, "Dev Patel", "2026-07-03"],
        [5, "Erin Lee", "2026-07-03"],
        [6, "Faisal Khan", "2026-07-04"],
        [7, "Gina Ross", "2026-07-04"],
        [8, "Huan Zhao", "2026-07-05"],
      ];
      for (const [id, customerName, placedAt] of orders) {
        db.run("INSERT INTO orders (id, customer_name, placed_at) VALUES (?, ?, ?)", [id, customerName, placedAt]);
      }

      const items: [number, number, string, number][] = [
        [1, 1, "SKU-100", 2],
        [2, 1, "SKU-101", 1],
        [3, 2, "SKU-102", 3],
        [4, 3, "SKU-100", 1],
        [5, 3, "SKU-103", 2],
        [6, 3, "SKU-104", 1],
        [7, 4, "SKU-101", 5],
        [8, 5, "SKU-102", 1],
        [9, 5, "SKU-103", 1],
        [10, 6, "SKU-100", 4],
        [11, 7, "SKU-104", 2],
        [12, 7, "SKU-101", 1],
        // order 8 has no items on purpose — an edge case a naive fix can miss.
      ];
      for (const [id, orderId, sku, quantity] of items) {
        db.run("INSERT INTO order_items (id, order_id, sku, quantity) VALUES (?, ?, ?, ?)", [
          id,
          orderId,
          sku,
          quantity,
        ]);
      }

      return db;
    });
  }
  return dbPromise;
}
