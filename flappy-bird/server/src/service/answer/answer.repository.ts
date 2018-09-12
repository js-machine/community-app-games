import { Answer } from '../../model';

export abstract class AnswerRepository {
    public abstract getAnswers(questionId: number): Promise<Answer[]>;
    public abstract getRightAnswers(questionId: number): Promise<Answer[]>;
}
