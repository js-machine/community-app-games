import { inject, injectable } from 'inversify';

import { LoggerService } from '../logger';
import { UserService } from '../user';
import { QuestionService } from '../question';
import { AnswerService } from '../answer';

import { Answer } from '../../model';

import { SendAnswerRepository } from './send-answer.repository';

@injectable()
export class SendAnswerService {
    constructor(
        @inject(LoggerService) private loggerService: LoggerService,
        @inject(UserService) private userService: UserService,
        @inject(QuestionService) private questionService: QuestionService,
        @inject(AnswerService) private answerService: AnswerService,
        @inject(SendAnswerRepository) private sendAnswerRepository: SendAnswerRepository
    ) { }

    public async sendAnswer(question: string, answers: string[], userToken: string): Promise<boolean> {
        let questionId: number;
        let rightAnswers: string[];
        let isRight: boolean = false;
        let userId: number;
        let isUpdateQuestionMarkTable: boolean;

        try {
            userId = (await this.userService.getUser(userToken)).id;
        } catch (error) {
            this.loggerService.errorLog(error);
            throw error;
        }

        try {
            questionId = await this.questionService.getQuestionId(question);
        } catch (error) {
            this.loggerService.errorLog(error);
            throw error;
        }

        try {
            rightAnswers = (await this.answerService.getRightAnswers(questionId)).map((answer: Answer) => answer.answer);
        } catch (error) {
            this.loggerService.errorLog(error);
            throw error;
        }

        if (answers.length === rightAnswers.length) {
            isRight = rightAnswers.every((answer: string) => answers.indexOf(answer) >= 0);
        }

        if (isRight) {
            try {
                isUpdateQuestionMarkTable = await this.questionService.updateQuestionMarkTable(userId, questionId);
            } catch (error) {
                this.loggerService.errorLog(error);
                throw error;
            }
        }

        return isRight;
    }
}
