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

        let findCorrect = (questArr: any[], correctAns: number[]) => {
             const resultArr = questArr.filter((item, index) => {
                 return correctAns.indexOf(index + 1) !== -1;
             });
             return resultArr;
        };

        console.log(allAnswers);

        // allUserAnswers = allUserAnswers.map((row: QuestionMarkTableRow) => row.questionId);
        // console.log(allUserAnswers);
        // const answeredQuestionsText = findCorrect(allQuestions.map((item) => item.question), allUserAnswers)
        //     .map(item => {
        //         return { question: item }
        //     });
        // console.log(answeredQuestionsText);

        // // allAnswers = allAnswers.map(item => {
        // //     return {id: item.questionId, answer: [item.answer]};
        // // });
        // console.log(allAnswers);

        // const answersForRender = allAnswers.filter((item) => {
        //     return allUserAnswers.indexOf(item.id) !== -1;
        // });
        // console.log(answersForRender);

        // let assignOfAnswersAndQuestions = (questionsArray: any[], answersArray: any) => {
        //     let output = [];
        //     for (let i = 0; i < questionsArray.length; i++) {
        //         output.push(Object.assign(questionsArray[i], answersArray[i]));
        //     }
        //     return output;
        // };

        // const questionsAndAnwers: any[] = answeredQuestionsText.map((item) => {
        //     return {
        //         question: item,
        //         answer: ['xxx', 'yyy', 'zzz'],
        //         isRight: 1
        //     };
        // });

        const result: any = {
            totalScore: lastGame.score + scoreFromQuiz,
            totalQuestions: lastGame.question,
            correctAnswers: myRightAnswers.length,
            /* questionsAndAnwers */
        };

        return result;
    }
}
