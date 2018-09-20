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

export interface QuizAnswers {
  userToken: string;
  quiz: Quiz[];
}

export interface FinalResult {
  totalScore: number;
  totalQuestions: number;
  correctAnswers: number;
}
