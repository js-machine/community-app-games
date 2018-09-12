import { injectable, inject } from 'inversify';

import { LoggerService } from '../logger';

import { QuizRepository } from './quiz.repository';

@injectable()
export class QuizRepositoryImplementation implements QuizRepository {
  constructor(
    @inject(LoggerService) private loggerService: LoggerService,
  ) { }
}
