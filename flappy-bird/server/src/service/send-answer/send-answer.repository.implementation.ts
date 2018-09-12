import { injectable, inject } from 'inversify';

import { QuizAnswersModel } from 'models';
import { LoggerService } from '../logger';
import { Answer } from '../../model';

import { SendAnswerRepository } from './send-answer.repository';

@injectable()
export class SendAnswerRepositoryImplementation implements SendAnswerRepository {
  constructor(
    @inject(LoggerService) private loggerService: LoggerService,
  ) { }

  public async getAnswers(questionId: number): Promise<Answer[]> {
    try {
      const answers = await QuizAnswersModel.findAll({
        where: {
          questionId
        }
      });

      return answers;
    } catch (error) {
      this.loggerService.errorLog(error);
      throw error;
    }
  }
}
