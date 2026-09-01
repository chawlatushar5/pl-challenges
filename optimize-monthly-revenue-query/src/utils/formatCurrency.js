function formatCurrency(amount) {
  return `$${Number(amount).toFixed(2)}`;
}

module.exports = { formatCurrency };
