import { inject, injectable } from 'inversify';

import { LoggerService } from '../logger';
import { UserService } from '../user';
import { QuestionService } from '../question';
import { AnswerService } from '../answer';
import { GameService } from '../game';

import { Answer, Question } from 'model';

interface Quiz {
    question: string;
    answers: string[];
}
import { technicalErr } from 'errors';
@injectable()
export class QuizService {
    constructor(
        @inject(LoggerService) private loggerService: LoggerService,
        @inject(UserService) private userService: UserService,
        @inject(QuestionService) private questionService: QuestionService,
        @inject(AnswerService) private answerService: AnswerService,
        @inject(GameService) private gameService: GameService,
    ) { }

    public async getQuiz(userToken: string): Promise<Quiz[]> {
        let question: Question;
        const quiz: Quiz[] = [];
        let answers: Answer[];
        let userId: number;
        let countOfQuestion: number;
        let isRefreshSession: boolean;

        try {
            userId = (await this.userService.getUser(userToken)).id;
        } catch {
            const error = technicalErr.userService.getUser.msg;

            this.loggerService.errorLog(error);
            throw new Error(error);
        }

        try {
            countOfQuestion = (await this.gameService.getLastGame(userId)).question;
            const questionsCount = (await this.questionService.getQuestions()).length;
            countOfQuestion = Math.min(countOfQuestion, questionsCount);
        } catch {
            const error = technicalErr.gameService.getLastGame.msg;

            this.loggerService.errorLog(error);
            throw new Error(error);
        }

        try {
            isRefreshSession = await this.questionService.refreshSession(userId);
        } catch {
            const error = technicalErr.questionService.refreshSession.msg;

            this.loggerService.errorLog(error);
            throw new Error(error);
        }
        for (let i = 0; i < countOfQuestion; i++) {

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

            quiz.push({
                question: question.question,
                answers: answers.map((answer) => answer.answer)
            });
        }

        return quiz;
    }
}
