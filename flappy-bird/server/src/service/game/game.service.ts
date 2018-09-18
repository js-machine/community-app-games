import { inject, injectable } from 'inversify';

import { LoggerService } from '../logger';
import { UserService } from '../user';

import { technicalErr } from './../../../errors';

import { GameRepository } from './game.repository';

@injectable()
export class GameService {
    constructor(
        @inject(LoggerService) private loggerService: LoggerService,
        @inject(UserService) private userService: UserService,
        @inject(GameRepository) private gameRepository: GameRepository
    ) { }

    public async saveGameResult(userToken: string, score: number, question: number): Promise<boolean> {
        let userId: number;

        try {
            userId = (await this.userService.getUser(userToken)).id;
        } catch {
            const error = technicalErr.userService.getUser.msg;

            this.loggerService.errorLog(error);
            throw new Error(error);
        }

        try {
            const isAdd = await this.gameRepository.saveGameResults(userId, score, question);

            return isAdd;
        } catch {
            const error = technicalErr.gameRepository.saveGameResults.msg;

            this.loggerService.errorLog(error);
            throw new Error(error);
        }
    }
}
