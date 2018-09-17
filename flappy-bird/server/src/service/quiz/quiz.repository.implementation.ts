import { injectable } from 'inversify';

import { QuizRepository } from './quiz.repository';

@injectable()
export class QuizRepositoryImplementation implements QuizRepository {}
