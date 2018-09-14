import { Answer } from '../../model';

export abstract class SendAnswerRepository {
    public abstract getAnswers(questionId: number): Promise<Answer[]>;
}
