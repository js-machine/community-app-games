import { inject, injectable } from 'inversify';

import { LoggerService } from '../logger';
import { Question, UnAnsweredQuestion } from '../../model';

import { QuestionRepository } from './question.repository';

@injectable()
export class QuestionService {
    constructor(
        @inject(LoggerService) private loggerService: LoggerService,
        @inject(QuestionRepository) private questionRepository: QuestionRepository
    ) { }

    public async getQuestions(): Promise<Question[]> {
        try {
            const questions = await this.questionRepository.getQuestions();

            return questions;
        } catch (error) {
            this.loggerService.errorLog(error);
            throw error;
        }
    }

    public async getQuestion(userId: number): Promise<Question> {
        let unAnsweredQuestions: UnAnsweredQuestion[];

        try {
            unAnsweredQuestions = await this.questionRepository.getUnansweredQuestions(userId);
        } catch (error) {
            this.loggerService.errorLog(error);
            throw error;
        }

        const id = Math.floor(Math.random() * (unAnsweredQuestions.length));

        try {
            const question = await this.questionRepository.getQuestion(unAnsweredQuestions[id].questionId);

            return question;
        } catch (error) {
            this.loggerService.errorLog(error);
            throw error;
        }
    }

    public async getQuestionId(question: string): Promise<number> {
        try {
            return (await this.questionRepository.getQuestionId(question)).id;
        } catch (error) {
            this.loggerService.errorLog(error);
            throw error;
        }
    }

    public async updateQuestionMarkTable(userid: number, questionId: number): Promise<boolean> {
        try {
            const isUpdate = await this.questionRepository.updateQuestionMarkTable(userid, questionId);

            return isUpdate;
        } catch (error) {
            this.loggerService.errorLog(error);
            throw error;
        }
    }

    public async checkQuestionMarkTableForNewUser(userId: number): Promise<number> {
        try {
            const count = await this.questionRepository.checkQuestionMarkTableForNewUser(userId);

            return count;
        } catch (error) {
            this.loggerService.errorLog(error);
            throw error;
        }
    }

    public async addUserToQuestionMarkTable(userId: number, questionsId: number[]): Promise<boolean> {
        try {
            const isAdd = await this.questionRepository.addUserToQuestionMarkTable(userId, questionsId);

            return isAdd;
        } catch (error) {
            this.loggerService.errorLog(error);
            throw error;
        }
    }
}
