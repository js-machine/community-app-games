export enum TodoStatus {
  INIT,
  ADDING,
  ADDED,
  ERROR
}

export enum Status {
  INIT,
  FETCHING,
  SUCCESS,
  ERROR
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
