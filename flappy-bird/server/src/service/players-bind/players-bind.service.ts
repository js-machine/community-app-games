import { inject, injectable } from 'inversify';

import { LoggerService } from '../logger';
import { PlayersBind } from './../../model';

import { PlayerBindRepository } from './players-bind.repository';
import { RoomService } from 'service/room';

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
            throw new Error(`Request body don't have 'room' property`);
        } else if (!playersBind.players) {
            throw new Error(`Request body don't have 'players' property`);
        }
        else {
            return true;
        }
    }
}
