import { inject, injectable } from 'inversify';

import { LoggerService } from '../logger';
import { Answer } from 'model';

import { AnswerRepository } from './answer.repository';
import { technicalErr } from 'errors';
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
        } catch {
            const error = technicalErr.answerRepository.getAnswers.msg;

            this.loggerService.errorLog(error);
            throw new Error(error);
        }
    }

    public async getRightAnswers(questionId: number): Promise<Answer[]> {
        try {
            const questions = await this.answerRepository.getRightAnswers(questionId);

            return questions;
        } catch {
            const error = technicalErr.answerRepository.getRightAnswers.msg;

            this.loggerService.errorLog(error);
            throw new Error(error);
        }
    }
}
