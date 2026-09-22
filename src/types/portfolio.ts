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

export type ActionType = 'TRIMMED' | 'ADDED' | 'INCREASED' | 'SOLD';

export interface PortfolioChange {
  id: string;
  company: string;
  ticker: string;
  action: ActionType;
  period: string;
  sharesOrValue: string;
  rationale: string;
}

export interface OperatingSubsidiary {
  id: string;
  name: string;
  category: 'Insurance' | 'Railroad' | 'Energy & Utilities' | 'Manufacturing' | 'Service & Retail';
  acquiredYear: number;
  description: string;
  highlightMetric: string;
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
