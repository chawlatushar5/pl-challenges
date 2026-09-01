-- 500k synthetic rows spanning 2021-01-01 through 2026-06-30 (~66 months),
-- so a single month is roughly 1/66th of the table (~7.5k rows) — a
-- filtered, indexed query and a full scan diverge by nearly two orders of
-- magnitude, structurally obvious in an EXPLAIN plan regardless of sandbox
-- CPU speed. Deliberately NOT millions of rows: the naive starting
-- implementation genuinely pulls every row into Node's process memory, and
-- the sandbox has under 1GB RAM with a ~440MB default V8 heap — 5M rows
-- reliably OOM-crashed the test run entirely (no jest report ever gets
-- written, which the scoring pipeline treats as an infra error, not the
-- low-but-real score a naive submission should actually get). 500k is
-- still an unambiguous full-scan-vs-index-scan gap without crashing the
-- thing meant to demonstrate it.
INSERT INTO transactions (account_id, merchant_category, txn_date, amount)
SELECT
  (random() * 500000)::int + 1,
  (ARRAY['Groceries', 'Electronics', 'Travel', 'Dining', 'Utilities', 'Entertainment', 'Fuel', 'Healthcare'])[floor(random() * 8 + 1)],
  (date '2021-01-01' + (random() * (date '2026-06-30' - date '2021-01-01'))::int)::date,
  round((random() * 2000 + 1)::numeric, 2)
FROM generate_series(1, 500000);

-- Without this, the planner has no row-count/selectivity stats for the
-- table it just bulk-loaded and may not choose the index scan the
-- efficiency test depends on.
ANALYZE transactions;
