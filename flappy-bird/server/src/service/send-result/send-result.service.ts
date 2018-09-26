import { inject, injectable } from 'inversify';
import { CommunityLayer, GameResult, ResultStatus, ParticipationStatus } from 'community-layer';
const communityLayer = new CommunityLayer();

import { LoggerService } from '../logger';
import { UserService } from '../user';
import { QuestionService } from '../question';
import { GameService } from '../game';
import { AppTokenService } from '../app-token';

import { Answer, Quiz, QuestionMarkTableRow, FinalResult, Game } from 'model';
import { technicalErr } from 'errors';
@injectable()
export class SendResultService {
    constructor(
        @inject(LoggerService) private loggerService: LoggerService,
        @inject(UserService) private userService: UserService,
        @inject(QuestionService) private questionService: QuestionService,
        @inject(GameService) private gameService: GameService,
        @inject(AppTokenService) private appTokenService: AppTokenService

    ) { }

    public async sendResult(userToken: string, isAfterQuiz: boolean): Promise<boolean> {
        let userId: number;
        let lastGame: Game;
        let scoreFromQuiz: number = 0;
        let userRightAnswers: number[];
        let appToken: string;
        let finalUsersStat: GameResult;
        let scores: number = 0;

        try {
            userId = (await this.userService.getUser(userToken)).id;
        } catch {
            const error = technicalErr.userService.getUser.msg;

            this.loggerService.errorLog(error);
            throw new Error(error);
        }

        try {
            appToken = 'Bearer ' + (await this.appTokenService.getAppToken()).token;
        } catch {
            const error = technicalErr.appTokenService.getAppToken.msg;

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

        const playedTime = (lastGame.updatedAt.getTime() - lastGame.createdAt.getTime()) / 1000;

        if (isAfterQuiz) {
            try {
                userRightAnswers = (await this.questionService.getUserRightAnswers(userId))
                    .map((row: QuestionMarkTableRow) => row.questionId);
            } catch {
                const error = technicalErr.questionService.getUserRightAnswers.msg;

                this.loggerService.errorLog(error);
                throw new Error(error);
            }

            if (userRightAnswers.length > 0) {
                for (let i = 0; i < userRightAnswers.length; i++) {
                    try {
                        const scoreFromQuestion = (await this.questionService.getQuestionById(userRightAnswers[i])).points;
                        scoreFromQuiz += scoreFromQuestion;
                    } catch {
                        const error = technicalErr.questionService.getQuestionById.msg;

                        this.loggerService.errorLog(error);
                        throw new Error(error);
                    }
                }
            }
            scores = scoreFromQuiz + lastGame.score;
        } else {
            scores += lastGame.score;
        }

        finalUsersStat = {
            userToken,
            playedTime,
            scores,
            resultStatus: ResultStatus.Win,
            participationStatus: ParticipationStatus.Play,
        };

        const userStatistics: GameResult[] = [];
        userStatistics.push(finalUsersStat);
        communityLayer.gameCycle.setGameResult(userStatistics, appToken);

        return true;
    }
}
