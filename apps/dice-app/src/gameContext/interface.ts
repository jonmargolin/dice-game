
export interface GameContextData {
    userId: string;
    rollList: number[];
    rollProbability: number;
    rollSum: number;
    roundNumber: number;
  }
export  interface RoundEndState{
    status: boolean,
    timer:number
}
export interface RoundResult {
  data:ResultItem[];
  isWin: boolean;
}
export  interface ResultItem{
    rollList: string;
    rollSum: number;
    userId: string
}