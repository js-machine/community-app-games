import { injectable, inject } from 'inversify';
import { RoomRepository } from 'service/room/room.repository';
import uuid from 'uuid/v4';
import { LoggerService } from '../logger/logger.service';

let rooms: string[] = [];

@injectable()
export class RoomRepositoryImplementation implements RoomRepository {
  constructor(
    @inject(LoggerService) private loggerService: LoggerService,
  ) { }

  public createToken(): string {
    const roomToken = uuid();

    if (roomToken) {
      this.saveToken(roomToken);
      return roomToken;
    } else {
      this.loggerService.errorLog(`Problem with creation roomToken`);
    }
  }

  public saveToken(roomToken: string): void {
    // Возможно уже больше эта логика не используется
    rooms.push(roomToken);
  }
}
