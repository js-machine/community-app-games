import { injectable, inject } from 'inversify';

import { LoggerService } from '../logger/logger.service';
import { PlayerBindRepository } from 'service/players-bind/players-bind.repository';
import { PlayersBind } from './../../model';

const playersBinds: PlayersBind[] = [];

@injectable()
export class PlayerBindRepositoryImplementation implements PlayerBindRepository {
  constructor(
    @inject(LoggerService) private loggerService: LoggerService,
  ) { }

  public savePlayersBind(playersBind: PlayersBind): void {
    playersBinds.push(playersBind);
  }
}
