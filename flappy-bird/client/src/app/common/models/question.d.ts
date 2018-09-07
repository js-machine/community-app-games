declare module IQuestions {

    export interface IQuestion{
        questionId: number;
        questionText: string;
        answers: IAnswer[];
        questionType: string;
        questionValue: number;
        rightAnswers: IAnswer[];
    }

    export interface IAnswer{
        id: number;
        answerText: string;
        points?: number;
    }

    export interface IUserQuestionResult{
        questionId: number;
        questionText: string;
        answers: IUserAnswer[];
        questionType: string;
        questionValue: number;

        questionUsersScore: number;
        spentTime: number;
    }

    export interface IUserAnswer{
        id: number;
        answerText: string;
        points: number;
        isChecked: boolean;
    }

}

declare module 'IQuestions/IUserQuestionResult' {
    export default IQuestions;
}
