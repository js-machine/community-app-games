import { Question, QuestionMarkTableRow, Answer } from 'model';

export abstract class QuestionRepository {
    public abstract addUserToQuestionMarkTable(userId: number, questionsId: number[]): Promise<boolean>;
    public abstract checkQuestionMarkTableForNewUser(userId: number): Promise<number>;
    public abstract getQuestion(questionId: number, userId: number): Promise<Question>;
    public abstract getQuestionById(id: number): Promise<Question>;
    public abstract getQuestions(): Promise<Question[]>;
    public abstract getQuestionId(question: string): Promise<Question>;
    public abstract getSizeOfQuiz(userId: number): Promise<number>;
    public abstract getUnansweredQuestions(userId: number): Promise<QuestionMarkTableRow[]>;
    public abstract getUserRightAnswers(userId: number): Promise<QuestionMarkTableRow[]>;
    public abstract markCorrectAnswer(userId: number, questionId: number): Promise<boolean>;
    public abstract refreshSession(userId: number): Promise<boolean>;
    public abstract refreshUserAnswersQuestionMarkTable(userId: number): Promise<boolean>;
    public abstract getAllUsersAnswers(userId: number): Promise<QuestionMarkTableRow[]>;
    public abstract getAllAnswers(): Promise<Answer[]>;
}
