import { inject, injectable } from 'inversify';

import { LoggerService } from '../logger';
import { PlayersBind } from 'model';

import { PlayerBindRepository } from './players-bind.repository';
import { RoomService } from 'service/room';

import { technicalErr } from 'errors';
@injectable()
export class PlayersBindService {
    constructor(
        @inject(LoggerService) private loggerService: LoggerService,
        @inject(PlayerBindRepository) private playerBindRepository: PlayerBindRepository,
        @inject(RoomService) private roomService: RoomService

    ) { }

    public savePlayersBind(playersBind: PlayersBind): void {
        if (this.checkPlayersBind(playersBind)) {
            this.playerBindRepository.savePlayersBind(playersBind);
            this.roomService.addRoom(playersBind);
        }
    }

    public checkPlayersBind(playersBind: PlayersBind): boolean {
        if (!playersBind.room) {
            const error = technicalErr.playerBindService.noRoomToken.msg;

            this.loggerService.errorLog(error);
            throw new Error(error);
        } else if (!playersBind.players) {
            const error = technicalErr.playerBindService.noPlayers.msg;

            this.loggerService.errorLog(error);
            throw new Error(error);
        } else {
            return true;
        }
    }
}
