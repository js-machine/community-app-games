import { injectable, inject } from 'inversify';

import { PlayerBindRepository } from 'service/players-bind/players-bind.repository';
import { PlayersBind } from 'model';

const playersBinds: PlayersBind[] = [];

@injectable()
export class PlayerBindRepositoryImplementation implements PlayerBindRepository {
  public savePlayersBind(playersBind: PlayersBind): void {
    playersBinds.push(playersBind);
  }
}
