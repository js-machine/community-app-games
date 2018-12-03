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
        let allUserAnswers: QuestionMarkTableRow[];
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
            allUserAnswers = (await this.questionService.getAllUsersAnswers(userId));

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
        };

        let findCorrect = (questArr: any[], correctAns: any[]) => {
             const resultArr = questArr.filter((item, index) => {
                 return correctAns.indexOf(index + 1) !== -1;
             });
             return resultArr;
        };

        console.log(allUserAnswers);

        const answersForRender = allAnswers.filter((item) => allUserAnswers.map(item => item.questionId).indexOf(+item.questionId) !== -1 );
        console.log(answersForRender);

        const answeredQuestionsText = findCorrect(allQuestions.map((item) => item.question), allUserAnswers.map(item => item.questionId))
        .map((item) => {
        return { question: item };
        });

        let assignOfAnswersAndQuestions = (questionsTxt: any[], answersArr: any) => {
             let output = [];
             for (let i = 0; i < questionsTxt.length; i++) {
                output.push(Object.assign(questionsTxt[i], answersArr[i]));
             }
             return output;
        };

        const questionsAndAnswers = assignOfAnswersAndQuestions(assignOfAnswersAndQuestions(answeredQuestionsText, answersForRender), allUserAnswers.map(item => {return{ isRight: item.isRight}}));
        console.log(questionsAndAnswers);

        const result: any = {
            totalScore: lastGame.score + scoreFromQuiz,
            totalQuestions: lastGame.question,
            correctAnswers: myRightAnswers.length,
            questionsAndAnswers
        };

        return result;
    }
}
