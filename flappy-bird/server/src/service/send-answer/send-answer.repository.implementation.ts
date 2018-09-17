import { injectable, inject } from 'inversify';

import { SendAnswerRepository } from './send-answer.repository';

@injectable()
export class SendAnswerRepositoryImplementation implements SendAnswerRepository {}
