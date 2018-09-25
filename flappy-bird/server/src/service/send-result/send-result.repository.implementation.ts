import { injectable, inject } from 'inversify';

import { SendResultRepository } from './send-result.repository';

@injectable()
export class SendResultRepositoryImplementation implements SendResultRepository {}
