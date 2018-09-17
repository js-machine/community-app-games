import { injectable } from 'inversify';

import { StartGameRepository } from './start-game.repository';

@injectable()
export class StartGameRepositoryImplementation implements StartGameRepository {}
