// Base stock data coming from Excel / static source
export interface Stock {
  symbol: string;          // e.g. TCS, RELIANCE
  name: string;            // Company name
  sector: string;          // IT, Banking, FMCG
  exchange: 'NSE' | 'BSE'; // Exchange
  purchasePrice: number;
  quantity: number;
}

// Stock after enriching with live market data
export interface LiveStock extends Stock {
  cmp: number;                 // Current Market Price
  peRatio: number | null;      // Can be unavailable
  earnings: string | null;     // Latest earnings info

  investment: number;
  presentValue: number;
  gainLoss: number;
  portfolioPercent: number;
}

// Sector-level aggregation
export interface SectorSummary {
  sector: string;
  totalInvestment: number;
  totalPresentValue: number;
  totalGainLoss: number;
}
