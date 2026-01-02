
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
  ideaSummary: string; // Concise summary of the user's input
  analysisIntent: string; // Explanation of what follows in the analysis
  summary: string; // The strategic overview
  suggestions: IPSuggestion[];
  overallMoatScore: number;
}
