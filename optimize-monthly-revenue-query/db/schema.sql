CREATE TABLE IF NOT EXISTS transactions (
  txn_id BIGSERIAL PRIMARY KEY,
  account_id INTEGER NOT NULL,
  merchant_category TEXT NOT NULL,
  txn_date DATE NOT NULL,
  amount NUMERIC(10, 2) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_transactions_txn_date ON transactions (txn_date);
