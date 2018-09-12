import { injectable, inject } from 'inversify';
import { LoggerService } from '../';

import { StartGameRepository } from './start-game.repository';

@injectable()
export class StartGameRepositoryImplementation implements StartGameRepository {
  constructor(
    @inject(LoggerService) private loggerService: LoggerService,
  ) { }
}
