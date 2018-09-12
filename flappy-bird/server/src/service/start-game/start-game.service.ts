import { inject, injectable } from 'inversify';

import { LoggerService } from '../logger';
import { UserService } from '../user';
import { QuestionService } from '../question';

import { StartGameRepository } from './start-game.repository';

@injectable()
export class StartGameService {
    constructor(
        @inject(LoggerService) private loggerService: LoggerService,
        @inject(QuestionService) private questionService: QuestionService,
        @inject(UserService) private userService: UserService,
        @inject(StartGameRepository) private startGameRepository: StartGameRepository
    ) { }

    public async startGame(userToken: string): Promise<boolean> {
        let userId: number;
        let count: number;
        let questionsId: number[];
        let isAddUserToQuestionMarkTable: boolean = false;
        let isAddUserToUserTable: boolean = false;

        try {
            userId = (await this.userService.getUser(userToken)).id;
        } catch (error) {
            this.loggerService.errorLog(error);
        }
        if (!userId) {
            try {
                isAddUserToUserTable = await this.userService.addUserToUserTable(userToken);
            } catch (error) {
                this.loggerService.errorLog(error);
                throw error;
            }

            try {
                userId = (await this.userService.getUser(userToken)).id;
            } catch (error) {
                this.loggerService.errorLog(error);
                throw error;
            }
        }

        try {
            count = await this.questionService.checkQuestionMarkTableForNewUser(userId);
        } catch (error) {
            this.loggerService.errorLog(error);
            throw error;
        }

        if (count < 1) {
            try {
                questionsId = (await this.questionService.getQuestions()).map((question) => question.id);
            } catch (error) {
                this.loggerService.errorLog(error);
                throw error;
            }

            try {
                isAddUserToQuestionMarkTable = await this.questionService.addUserToQuestionMarkTable(userId, questionsId);
            } catch (error) {
                this.loggerService.errorLog(error);
                throw error;
            }
        }
        return isAddUserToQuestionMarkTable;
    }
}
