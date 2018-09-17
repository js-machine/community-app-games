import { inject, injectable } from 'inversify';

import {
    PlayersBind,
    ParticipationStatus,
    ResultStatus,
    RoomStatus,
    Room
} from './../../model';

import { RoomRepository } from 'service/room/room.repository';

const rooms: Room[] = [];

@injectable()
export class RoomService {
    constructor(
        @inject(RoomRepository) private roomRepository: RoomRepository
    ) { }

    public createToken(): string {
        return this.roomRepository.createToken();
    }

    public addRoom(playersBind: PlayersBind): void {
        const players = playersBind.players.map((playerToken) => ({
            playerToken,
            playerSocket: null,
            participationStatus: ParticipationStatus.INIT,
            resultStatus: ResultStatus.INIT
        }));

        rooms.push({
            roomToken: playersBind.room,
            players,
            status: RoomStatus.INIT
        });
    }
}
