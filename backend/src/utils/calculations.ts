export const calculateInvestment = (
  purchasePrice: number,
  quantity: number
): number => {
  return purchasePrice * quantity;
};

export const calculatePresentValue = (
  cmp: number,
  quantity: number
): number => {
  return cmp * quantity;
};

export const calculateGainLoss = (
  presentValue: number,
  investment: number
): number => {
  return presentValue - investment;
};

export const calculatePortfolioPercent = (
  investment: number,
  totalInvestment: number
): number => {
  if (totalInvestment === 0) return 0;
  return (investment / totalInvestment) * 100;
};
