import { injectable } from 'inversify';

import { GetResultRepository } from './get-result.repository';

@injectable()
export class GetResultRepositoryImplementation implements GetResultRepository {}
