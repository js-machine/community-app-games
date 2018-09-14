import { injectable, inject } from 'inversify';

import { QuizAnswersModel } from 'models';
import { LoggerService } from '../logger';
import { Answer } from '../../model';

import { AnswerRepository } from './answer.repository';

@injectable()
export class AnswerRepositoryImplementation implements AnswerRepository {
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

  public async getRightAnswers(questionId: number): Promise<Answer[]> {
    try {
      const answers = await QuizAnswersModel.findAll({
        where: {
          questionId,
          isCorrect: 1
        }
      });

      return answers;
    } catch (error) {
      this.loggerService.errorLog(error);
      throw error;
    }
  }
}
