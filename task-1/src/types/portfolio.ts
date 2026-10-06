export type SectorType = 'Technology' | 'Financials' | 'Consumer' | 'Energy' | 'Healthcare' | 'Other';

export interface PortfolioHolding {
  id: string;
  name: string;
  ticker: string;
  shares: string;
  marketValueBillions: number;
  costBasisBillions: number;
  gainPercentage: number;
  portfolioWeight: number;
  berkshireOwnershipPercentage: number;
  sector: SectorType;
  sinceYear: number;
  annualDividendMillions: number;
  thesisSummary: string;
  rank: number;
}

export interface LiquidityMetrics {
  totalCashAndTreasuriesBillions: number;
  shortTermTreasuryBillsBillions: number;
  cashAndEquivalentsBillions: number;
  reportingDate: string;
  narrativeContext: string;
}

export interface PortfolioOverviewMetrics {
  totalPortfolioValueBillions: number;
  majorHoldingsCount: number;
  largestPositionTicker: string;
  largestPositionWeight: number;
  topSector: string;
  topSectorWeight: number;
  reportingDate: string;
}
