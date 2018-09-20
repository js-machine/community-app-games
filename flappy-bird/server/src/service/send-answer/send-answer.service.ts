import { inject, injectable } from 'inversify';

import { LoggerService } from '../logger';
import { UserService } from '../user';
import { QuestionService } from '../question';
import { AnswerService } from '../answer';
import { GameService } from '../game';


import { Answer, Quiz, QuestionMarkTableRow, FinalResult } from '../../model';
import { technicalErr } from '../../../errors';
@injectable()
export class SendAnswerService {
    constructor(
        @inject(LoggerService) private loggerService: LoggerService,
        @inject(UserService) private userService: UserService,
        @inject(QuestionService) private questionService: QuestionService,
        @inject(AnswerService) private answerService: AnswerService,
        @inject(GameService) private gameService: GameService,

    ) { }

    public async sendAnswers(userToken: string, quiz: Quiz[]): Promise<FinalResult> {
        let questionId: number;
        let rightAnswers: string[];
        let userId: number;
        let isUpdateQuestionMarkTable: boolean;
        let myRightAnswers: number[];
        let score: number;
        let scoreFromQuiz: number = 0;

        try {
            userId = (await this.userService.getUser(userToken)).id;
        } catch {
            const error = technicalErr.userService.getUser.msg;

            this.loggerService.errorLog(error);
            throw new Error(error);
        }

        for (let i = 0; i < quiz.length; i++) {
            const question = quiz[i].question;
            const answers = quiz[i].answers;
            let isRight: boolean = false;

            try {
                questionId = await this.questionService.getQuestionId(question);
            } catch {
                const error = technicalErr.questionService.getQuestionId.msg;

                this.loggerService.errorLog(error);
                throw new Error(error);
            }

            try {
                rightAnswers = (await this.answerService.getRightAnswers(questionId)).map((answer: Answer) => answer.answer);
            } catch {
                const error = technicalErr.answerService.getRightAnswers.msg;

                this.loggerService.errorLog(error);
                throw new Error(error);
            }

            if (answers.length === rightAnswers.length) {
                isRight = rightAnswers.every((answer: string) => answers.indexOf(answer) >= 0);
            }

            if (isRight) {
                try {
                    isUpdateQuestionMarkTable = await this.questionService.updateQuestionMarkTable(userId, questionId);
                } catch {
                    const error = technicalErr.questionService.updateQuestionMarkTable.msg;

                    this.loggerService.errorLog(error);
                    throw new Error(error);
                }
            }
        }

        try {
            myRightAnswers = (await this.questionService.getMyRightAnswers(userId)).map((row: QuestionMarkTableRow) => row.questionId);
        } catch {
            const error = technicalErr.questionService.getMyRightAnswers.msg;

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
            totalQuestions: quiz.length,
            correctAnswers: myRightAnswers.length
        };

        return result;
    }
}
