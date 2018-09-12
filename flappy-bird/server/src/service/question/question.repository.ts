import { Question, UnAnsweredQuestion } from '../../model';

export abstract class QuestionRepository {
    public abstract getUnansweredQuestions(userId: number): Promise<UnAnsweredQuestion[]>;
    public abstract getQuestions(): Promise<Question[]>;
    public abstract getQuestion(userId: number): Promise<Question>;
    public abstract getQuestionId(question: string): Promise<Question>;
    public abstract updateQuestionMarkTable(userId: number, questionId: number): Promise<boolean>;
    public abstract checkQuestionMarkTableForNewUser(userId: number): Promise<number>;
    public abstract addUserToQuestionMarkTable(userId: number, questionsId: number[]): Promise<boolean>;
}
