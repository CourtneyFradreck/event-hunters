export const roundUSD = (amount: number) => Math.round((amount + Number.EPSILON) * 100) / 100;

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2,
});

export const formatUSD = (amount: number) => usd.format(amount);
