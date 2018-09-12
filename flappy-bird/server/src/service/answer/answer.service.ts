import { inject, injectable } from 'inversify';

import { LoggerService } from '../logger';
import { Answer } from '../../model';

import { AnswerRepository } from './answer.repository';

@injectable()
export class AnswerService {
    constructor(
        @inject(LoggerService) private loggerService: LoggerService,
        @inject(AnswerRepository) private answerRepository: AnswerRepository
    ) { }

    public async getAnswers(questionId: number): Promise<Answer[]> {
        try {
            const questions = await this.answerRepository.getAnswers(questionId);

            return questions;
        } catch (error) {
            this.loggerService.errorLog(error);
            throw error;
        }
    }

    public async getRightAnswers(questionId: number): Promise<Answer[]> {
        try {
            const questions = await this.answerRepository.getRightAnswers(questionId);

            return questions;
        } catch (error) {
            this.loggerService.errorLog(error);
            throw error;
        }
    }
}
