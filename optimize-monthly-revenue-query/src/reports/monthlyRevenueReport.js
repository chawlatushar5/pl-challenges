const { pool } = require("../db");

// Revenue-by-category report for the finance team's month-end close.
// Currently pulls the entire transactions table into memory and filters
// here in JS — that was fine against the dev sample, but the table has
// grown to millions of rows in production, and this report is the thing
// that's going to page the DB team at 3am the next time it runs unfiltered.
async function getMonthlyRevenueReport(monthStart, monthEnd) {
  const { rows } = await pool.query("SELECT * FROM transactions");

  const inRange = rows.filter(
    (row) => row.txn_date >= monthStart && row.txn_date < monthEnd
  );

  const totals = {};
  for (const row of inRange) {
    totals[row.merchant_category] =
      (totals[row.merchant_category] || 0) + Number(row.amount);
  }
  return totals;
}

module.exports = { getMonthlyRevenueReport };
