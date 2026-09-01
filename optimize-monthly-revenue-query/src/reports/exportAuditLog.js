const { pool } = require("../db");

// Compliance export: every transaction over a threshold for a given
// account, used by the audit team on request. Unrelated to the monthly
// revenue report.
async function exportAuditLog(accountId, minAmount) {
  const { rows } = await pool.query(
    "SELECT txn_id, txn_date, amount FROM transactions WHERE account_id = $1 AND amount >= $2 ORDER BY txn_date",
    [accountId, minAmount]
  );
  return rows;
}

module.exports = { exportAuditLog };
