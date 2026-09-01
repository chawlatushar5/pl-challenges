# ledger-reports

A small finance reporting service backed by a seeded Postgres `transactions`
table (500k rows, 2021-01 through 2026-06, indexed on `txn_date`).

`src/reports/monthlyRevenueReport.js` pulls the entire table into memory and
filters in JS — correct, but a full scan on a production-sized table. The
hidden test suite re-runs the code's actual query through
`EXPLAIN (ANALYZE, FORMAT JSON)` and checks the query plan itself (no
sequential scan on `transactions`, only a small fraction of rows touched),
not the source text — so the fix has to push the date filter into the SQL
`WHERE` clause on the indexed `txn_date` column, not just narrow the output
in application code.
