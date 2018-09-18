export enum TodoStatus {
  INIT,
  ADDING,
  ADDED,
  ERROR
}

export enum Status {
  Init,
  Fetching,
  Success,
  Error
}

export interface EndGameStatistic {
  userToken: string;
  score: number;
  question: number;
}
export interface Quiz {
  question: string;
  answers: string[];
}
