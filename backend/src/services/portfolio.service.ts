import { Stock, LiveStock, SectorSummary } from '../types/portfolio';
import { getCMP } from './yahoo.service';
import { getFundamentals } from './google.service';

import {
  calculateInvestment,
  calculatePresentValue,
  calculateGainLoss,
  calculatePortfolioPercent
} from '../utils/calculations';

// TEMP: base portfolio data (simulating Excel input)
const basePortfolio: Stock[] = [
  {
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    sector: 'IT',
    exchange: 'NSE',
    purchasePrice: 3200,
    quantity: 10
  },
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries',
    sector: 'Energy',
    exchange: 'NSE',
    purchasePrice: 2400,
    quantity: 5
  }
];

export const buildPortfolio = async () => {
  // Step 1: Calculate total investment
  const totalInvestment = basePortfolio.reduce((sum, stock) => {
    return sum + calculateInvestment(stock.purchasePrice, stock.quantity);
  }, 0);

  // Step 2: Enrich stocks with live data + calculations
  const liveStocks: LiveStock[] = [];

  for (const stock of basePortfolio) {
    // Fetch live data in parallel
    const [cmp, fundamentals] = await Promise.all([
      getCMP(stock.symbol),
      getFundamentals(stock.symbol)
    ]);

    const investment = calculateInvestment(
      stock.purchasePrice,
      stock.quantity
    );

    const presentValue = calculatePresentValue(
      cmp,
      stock.quantity
    );

    const gainLoss = calculateGainLoss(presentValue, investment);

    const portfolioPercent = calculatePortfolioPercent(
      investment,
      totalInvestment
    );

    liveStocks.push({
      ...stock,
      cmp,
      peRatio: fundamentals.peRatio,
      earnings: fundamentals.earnings,
      investment,
      presentValue,
      gainLoss,
      portfolioPercent
    });
  }

  // Step 3: Sector-level aggregation
  const sectorMap: Record<string, SectorSummary> = {};

  for (const stock of liveStocks) {
    if (!sectorMap[stock.sector]) {
      sectorMap[stock.sector] = {
        sector: stock.sector,
        totalInvestment: 0,
        totalPresentValue: 0,
        totalGainLoss: 0
      };
    }

    sectorMap[stock.sector].totalInvestment += stock.investment;
    sectorMap[stock.sector].totalPresentValue += stock.presentValue;
    sectorMap[stock.sector].totalGainLoss += stock.gainLoss;
  }

  return {
    stocks: liveStocks,
    sectors: Object.values(sectorMap)
  };
};
