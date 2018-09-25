import { inject, injectable } from 'inversify';

import { LoggerService } from '../logger';
import { Question, QuestionMarkTableRow } from 'model';

import { QuestionRepository } from './question.repository';
import { technicalErr } from 'errors';
@injectable()
export class QuestionService {
    constructor(
        @inject(LoggerService) private loggerService: LoggerService,
        @inject(QuestionRepository) private questionRepository: QuestionRepository
    ) { }

    public async addUserToQuestionMarkTable(userId: number, questionsId: number[]): Promise<boolean> {
        try {
            const isAdd = await this.questionRepository.addUserToQuestionMarkTable(userId, questionsId);

            return isAdd;
        } catch {
            const error = technicalErr.questionRepository.addUserToQuestionMarkTable.msg;

            this.loggerService.errorLog(error);
            throw new Error(error);
        }
    }

    public async checkQuestionMarkTableForNewUser(userId: number): Promise<number> {
        try {
            const count = await this.questionRepository.checkQuestionMarkTableForNewUser(userId);

            return count;
        } catch {
            const error = technicalErr.questionRepository.checkQuestionMarkTableForNewUser.msg;

            this.loggerService.errorLog(error);
            throw new Error(error);
        }
    }

    public async getQuestions(): Promise<Question[]> {
        try {
            const questions = await this.questionRepository.getQuestions();

            return questions;
        } catch {
            const error = technicalErr.questionRepository.getQuestions.msg;

            this.loggerService.errorLog(error);
            throw new Error(error);
        }
    }

    public async getQuestionById(questionId: number): Promise<Question> {
        try {
            const question = await this.questionRepository.getQuestionById(questionId);

            return question;
        } catch {
            const error = technicalErr.questionRepository.getQuestionById.msg;

            this.loggerService.errorLog(error);
            throw new Error(error);
        }
    }

    public async getQuestion(userId: number): Promise<Question> {
        let unAnsweredQuestions: QuestionMarkTableRow[];
        let isRefresh: boolean;

        try {
            unAnsweredQuestions = await this.questionRepository.getUnansweredQuestions(userId);
        } catch {
            const error = technicalErr.questionRepository.getUnansweredQuestions.msg;

            this.loggerService.errorLog(error);
            throw new Error(error);
        }

        if (unAnsweredQuestions.length !== 0) {
            const id = Math.floor(Math.random() * unAnsweredQuestions.length);

            try {
                const question = await this.questionRepository.getQuestion(unAnsweredQuestions[id].questionId, userId);

                return question;
            } catch {
                const error = technicalErr.questionRepository.getQuestion.msg;

                this.loggerService.errorLog(error);
                throw new Error(error);
            }
        } else {
            try {
                isRefresh = await this.questionRepository.refreshUserAnswersQuestionMarkTable(userId);
            } catch {
                const error = technicalErr.questionRepository.refreshUserAnswersQuestionMarkTable.msg;

                this.loggerService.errorLog(error);
                throw new Error(error);
            }

            if (isRefresh) {
                try {
                    unAnsweredQuestions = await this.questionRepository.getUnansweredQuestions(userId);
                } catch {
                    const error = technicalErr.questionRepository.getUnansweredQuestions.msg;

                    this.loggerService.errorLog(error);
                    throw new Error(error);
                }

                const id = Math.floor(Math.random() * (unAnsweredQuestions.length));

                try {
                    const question = await this.questionRepository.getQuestion(unAnsweredQuestions[id].questionId,  userId);

                    return question;
                } catch {
                    const error = technicalErr.questionRepository.getQuestion.msg;

                    this.loggerService.errorLog(error);
                    throw new Error(error);
                }
            }
        }
    }

    public async getQuestionId(question: string): Promise<number> {
        try {
            return (await this.questionRepository.getQuestionId(question)).id;
        } catch {
            const error = technicalErr.questionRepository.getQuestionId.msg;

            this.loggerService.errorLog(error);
            throw new Error(error);
        }
    }

    public async getUserRightAnswers(userId: number): Promise<QuestionMarkTableRow[]> {
        try {
            const myRightAnswers = await this.questionRepository.getUserRightAnswers(userId);

            return myRightAnswers;
        } catch {
            const error = technicalErr.questionRepository.getUserRightAnswers.msg;

            this.loggerService.errorLog(error);
            throw new Error(error);
        }
    }

    public async getSizeOfQuiz(userId: number): Promise<number> {
        try {
            const size = await this.questionRepository.getSizeOfQuiz(userId);

            return size;
        } catch {
            const error = technicalErr.questionRepository.getSizeOfQuiz.msg;

            this.loggerService.errorLog(error);
            throw new Error(error);
        }
    }

    public async markCorrectAnswer(userId: number, questionId: number): Promise<boolean> {
        try {
            const isUpdate = await this.questionRepository.markCorrectAnswer(userId, questionId);

            return isUpdate;
        } catch {
            const error = technicalErr.questionRepository.markCorrectAnswer.msg;

            this.loggerService.errorLog(error);
            throw new Error(error);
        }
    }

    public async refreshSession(userId: number): Promise<boolean> {
        try {
            const isUpdate = await this.questionRepository.refreshSession(userId);

            return isUpdate;
        } catch {
            const error = technicalErr.questionRepository.refreshSession.msg;

            this.loggerService.errorLog(error);
            throw new Error(error);
        }
    }
}
