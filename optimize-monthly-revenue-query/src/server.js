const express = require("express");
const { getMonthlyRevenueReport } = require("./reports/monthlyRevenueReport");
const { getDailyMerchantVolume } = require("./reports/dailyMerchantVolume");
const { exportAuditLog } = require("./reports/exportAuditLog");

const app = express();

app.get("/api/reports/monthly-revenue", async (req, res) => {
  const { start, end } = req.query;
  const totals = await getMonthlyRevenueReport(new Date(start), new Date(end));
  res.json(totals);
});

app.get("/api/reports/daily-volume", async (req, res) => {
  const { day } = req.query;
  const volume = await getDailyMerchantVolume(new Date(day));
  res.json(volume);
});

app.get("/api/reports/audit-log", async (req, res) => {
  const { accountId, minAmount } = req.query;
  const rows = await exportAuditLog(Number(accountId), Number(minAmount));
  res.json(rows);
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`ledger-reports listening on ${port}`));
}

module.exports = { app };
