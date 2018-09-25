import { inject, injectable } from 'inversify';

import { LoggerService } from '../logger';
import { UserService } from '../user';
import { QuestionService } from '../question';
import { AnswerService } from '../answer';
import { GameService } from '../game';

import { Answer, Quiz, QuestionMarkTableRow, FinalResult } from 'model';
import { technicalErr } from '../../../errors';
@injectable()
export class GetResultService {
    constructor(
        @inject(LoggerService) private loggerService: LoggerService,
        @inject(UserService) private userService: UserService,
        @inject(QuestionService) private questionService: QuestionService,
        @inject(AnswerService) private answerService: AnswerService,
        @inject(GameService) private gameService: GameService,

    ) { }

    public async getResult(userToken: string): Promise<FinalResult> {
        let userId: number;
        let myRightAnswers: number[];
        let score: number;
        let scoreFromQuiz: number = 0;
        let quiz: number;

        try {
            userId = (await this.userService.getUser(userToken)).id;
        } catch {
            const error = technicalErr.userService.getUser.msg;

            this.loggerService.errorLog(error);
            throw new Error(error);
        }

        try {
            quiz = (await this.questionService.getSizeOfQuiz(userId));
        } catch {
            const error = technicalErr.questionService.getSizeOfQuiz.msg;

            this.loggerService.errorLog(error);
            throw new Error(error);
        }

        try {
            score = (await this.gameService.getLastGame(userId)).score;
        } catch {
            const error = technicalErr.gameService.getLastGame.msg;

            this.loggerService.errorLog(error);
            throw new Error(error);
        }

        try {
            myRightAnswers = (await this.questionService.getMyRightAnswers(userId)).map((row: QuestionMarkTableRow) => row.questionId);
        } catch {
            const error = technicalErr.questionService.getMyRightAnswers.msg;

            this.loggerService.errorLog(error);
            throw new Error(error);
        }

        if (myRightAnswers.length > 0) {
            for (let i = 0; i < myRightAnswers.length; i++) {
                try {
                    const scoreFromQuestion = (await this.questionService.getQuestionById(myRightAnswers[i])).points;
                    scoreFromQuiz += scoreFromQuestion;
                } catch {
                    const error = technicalErr.questionService.getQuestionById.msg;

                    this.loggerService.errorLog(error);
                    throw new Error(error);
                }
            }
        }

        const result: FinalResult = {
            totalScore: score + scoreFromQuiz,
            totalQuestions: quiz,
            correctAnswers: myRightAnswers.length
        };

        return result;
    }
}
