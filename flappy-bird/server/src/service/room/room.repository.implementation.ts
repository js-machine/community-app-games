import { injectable } from 'inversify';
import { RoomRepository } from 'service/room/room.repository';
import uuid from 'uuid/v4';

let rooms: string[] = [];

@injectable()
export class RoomRepositoryImplementation implements RoomRepository {
  public createToken(): string {
    const roomToken = uuid();

    this.saveToken(roomToken);
    return roomToken;
  }

  public saveToken(roomToken: string): void {
    // May be this logic doesn't use now
    rooms.push(roomToken);
  }
}
