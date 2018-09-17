import { inject, injectable } from 'inversify';

import { LoggerService } from '../logger';
import { UserService } from '../user';
import { QuestionService } from '../question';
import { AnswerService } from '../answer';

import { Answer, Question } from '../../model';

interface Quiz {
    question: string;
    answers: string[];
}
import { technicalErr } from './../../../errors';
@injectable()
export class QuizService {
    constructor(
        @inject(LoggerService) private loggerService: LoggerService,
        @inject(UserService) private userService: UserService,
        @inject(QuestionService) private questionService: QuestionService,
        @inject(AnswerService) private answerService: AnswerService,
    ) { }

    public async getQuiz(userToken: string): Promise<Quiz> {
        let question: Question;
        let answers: Answer[];
        let userId: number;

        try {
            userId = (await this.userService.getUser(userToken)).id;
        } catch {
            const error = technicalErr.userService.getUser.msg;

            this.loggerService.errorLog(error);
            throw new Error(error);
        }

        try {
            question = await this.questionService.getQuestion(userId);
        } catch {
            const error = technicalErr.questionService.getQuestion.msg;

            this.loggerService.errorLog(error);
            throw new Error(error);
        }

        try {
            answers = await this.answerService.getAnswers(question.id);
        } catch {
            const error = technicalErr.answerService.getAnswers.msg;

            this.loggerService.errorLog(error);
            throw new Error(error);
        }

        const quiz: Quiz = {
            question: question.question,
            answers: answers.map((answer) => answer.answer)
        };

        return quiz;
    }
}
