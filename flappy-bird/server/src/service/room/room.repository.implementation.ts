import { injectable } from 'inversify';
import { RoomRepository } from 'service/room/room.repository';
import { v4 as uuid } from 'uuid';

const rooms: string[] = [];

@injectable()
export class RoomRepositoryImplementation implements RoomRepository {
  public createToken(): string {
    const roomToken = uuid();

    this.saveToken(roomToken);
    return roomToken;
  }

  public saveToken(roomToken: string): void {
    // may be this logic doesn't use now
    rooms.push(roomToken);
  }
}
