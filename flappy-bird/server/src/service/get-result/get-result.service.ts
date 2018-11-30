import { inject, injectable } from 'inversify';

import { LoggerService } from '../logger';
import { UserService } from '../user';
import { QuestionService } from '../question';
import { GameService } from '../game';

import { QuestionMarkTableRow, FinalResult, Game, Question } from 'model';
import { technicalErr } from 'errors';

@injectable()
export class GetResultService {
    constructor(
        @inject(LoggerService) private loggerService: LoggerService,
        @inject(UserService) private userService: UserService,
        @inject(QuestionService) private questionService: QuestionService,
        @inject(GameService) private gameService: GameService,
    ) { }

    public async getResult(userToken: string): Promise<FinalResult> {
        let userId: number;
        let myRightAnswers: number[];
        let lastGame: Game;
        let scoreFromQuiz: number = 0;
        let allUserAnswers: any;
        let allQuestions: Question[];
        let allAnswers;

        try {
            userId = (await this.userService.getUser(userToken)).id;
        } catch {
            const error = technicalErr.userService.getUser.msg;

            this.loggerService.errorLog(error);
            throw new Error(error);
        }

        try {
            lastGame = await this.gameService.getLastGame(userId);
        } catch {
            const error = technicalErr.gameService.getLastGame.msg;

            this.loggerService.errorLog(error);
            throw new Error(error);
        }

        try {
            myRightAnswers = (await this.questionService.getUserRightAnswers(userId)).map((row: QuestionMarkTableRow) => row.questionId);
        } catch {
            const error = technicalErr.questionService.getUserRightAnswers.msg;

            this.loggerService.errorLog(error);
            throw new Error(error);
        }

        try {
            allUserAnswers = (await this.questionService.getAllUsersAnswers(userId)).map((row: QuestionMarkTableRow) => row.questionId);
        } catch {
            const error = technicalErr.questionService.getUserRightAnswers.msg;

            this.loggerService.errorLog(error);
            throw new Error(error);
        }

        try {
            allQuestions = await (this.questionService.getQuestions());

        } catch {
            const error = technicalErr.questionService.getUserRightAnswers.msg;

            this.loggerService.errorLog(error);
            throw new Error(error);
        }

        try {
            allAnswers = await (this.questionService.getAllAnswers());

        } catch {
            const error = technicalErr.questionService.getUserRightAnswers.msg;

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

        let findCorrect = (questArr: string[], correctAns: number[]) => {
            const resultArr = questArr.filter((item, index) => {
              return correctAns.indexOf(index + 1) !== -1;
            });
            return resultArr;
        };

        const answeredQuestionsText = findCorrect(allQuestions.map((item) => item.question), allUserAnswers);

        console.log('From question service: answered -----' + allUserAnswers);
        console.log('From question service: answered length -----' + allUserAnswers.length);
        console.log('From question service: answered length -----' + allUserAnswers.length);
        console.log('From question service: questions length -----' + allQuestions.map((item) => item.question).length);
        console.log('From question service: filtred questions array -----' + answeredQuestionsText);

        const questionsAndAnswers: any[] = answeredQuestionsText.map((item, index) => {
            return {
                question: item,
                answer: ['xxx', 'yyy', 'zzz'],
                isRight: 1
            };
        });

        console.dir('From question service: full output -----' + questionsAndAnswers);

        const result: FinalResult = {
            totalScore: lastGame.score + scoreFromQuiz,
            totalQuestions: lastGame.question,
            correctAnswers: myRightAnswers.length,
            questionsAndAnswers
        };

        return result;
    }
}
