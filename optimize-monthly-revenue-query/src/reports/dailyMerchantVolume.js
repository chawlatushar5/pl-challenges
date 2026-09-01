const { pool } = require("../db");

// Parcel/transaction volume per merchant category for a single day —
// already pushes its date filter into the WHERE clause, unlike the
// monthly revenue report. Nothing to fix here.
async function getDailyMerchantVolume(day) {
  const nextDay = new Date(day);
  nextDay.setDate(nextDay.getDate() + 1);

  const { rows } = await pool.query(
    "SELECT merchant_category, COUNT(*) AS volume FROM transactions WHERE txn_date >= $1 AND txn_date < $2 GROUP BY merchant_category",
    [day, nextDay]
  );
  return rows.map((row) => ({
    category: row.merchant_category,
    volume: Number(row.volume),
  }));
}

module.exports = { getDailyMerchantVolume };
