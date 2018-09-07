export interface Answer {
    id: number;
    answerText: string;
}

export interface Question {
    questionId: number;
    questionText: string;
    answers: Answer[];
    questionType: string;
    questionValue: number;
    rightAnswers: Answer[];
}
