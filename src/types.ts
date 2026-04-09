export type RiskBand = 'Red' | 'Amber' | 'Green';

export interface Part {
  id: string;
  plant: string;
  riskScore: number;
  riskBand: RiskBand;
  daysOfCover: number;
  leadTime: number;
  criticality: 'High' | 'Medium' | 'Low';
  recommendedAction: string;
}

export interface KPI {
  label: string;
  value: string | number;
  trend?: number;
  color?: string;
}
