import { injectable, inject } from 'inversify';

import { SaveAnswerRepository } from './save-answer.repository';

@injectable()
export class SaveAnswerRepositoryImplementation implements SaveAnswerRepository {}
