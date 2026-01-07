export interface LiveStock {
  symbol: string;
  name: string;
  sector: string;
  exchange: 'NSE' | 'BSE';
  purchasePrice: number;
  quantity: number;
  investment: number;
  portfolioPercent: number;
  cmp: number;
  presentValue: number;
  gainLoss: number;
  peRatio: number | null;
  earnings: string | null;
}

export interface SectorSummary {
  sector: string;
  totalInvestment: number;
  totalPresentValue: number;
  totalGainLoss: number;
}

export interface PortfolioResponse {
  stocks: LiveStock[];
  sectors: SectorSummary[];
}
