export interface RollResult {
  [key: string]: unknown;
  rollList: number[];
  rollProbability: number;
  rollSum: number;
  roundNumber: number;
  userId: string;
}
