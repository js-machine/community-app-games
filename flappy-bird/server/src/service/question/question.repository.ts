import { Question, UnAnsweredQuestion } from '../../model';

export abstract class QuestionRepository {
    public abstract addUserToQuestionMarkTable(userId: number, questionsId: number[]): Promise<boolean>;
    public abstract checkQuestionMarkTableForNewUser(userId: number): Promise<number>;
    public abstract getUnansweredQuestions(userId: number): Promise<UnAnsweredQuestion[]>;
    public abstract getQuestion(questionId: number, userId: number): Promise<Question>;
    public abstract getQuestions(): Promise<Question[]>;
    public abstract getQuestionId(question: string): Promise<Question>;
    public abstract refreshUserAnswersQuestionMarkTable(userId: number): Promise<boolean>;
    public abstract updateQuestionMarkTable(userId: number, questionId: number): Promise<boolean>;
}
