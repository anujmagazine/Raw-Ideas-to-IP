
export enum IPType {
  PATENT = 'Patent',
  TRADEMARK = 'Trademark',
  COPYRIGHT = 'Copyright',
  TRADE_SECRET = 'Trade Secret',
  DESIGN_RIGHT = 'Design Right'
}

export interface IPSuggestion {
  title: string;
  type: IPType;
  description: string;
  moatStrategy: string;
  complexity: number; // 1-5
  potentialValue: number; // 1-100
  differentiationFactor: string;
}

export interface AnalysisResult {
  summary: string;
  suggestions: IPSuggestion[];
  overallMoatScore: number;
}
