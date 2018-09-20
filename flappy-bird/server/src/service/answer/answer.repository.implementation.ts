import { injectable, inject } from 'inversify';

import { QuizAnswersModel } from 'models';
import { LoggerService } from '../logger';
import { Answer } from '../../model';

import { AnswerRepository } from './answer.repository';
import { technicalErr } from 'errors';
@injectable()
export class AnswerRepositoryImplementation implements AnswerRepository {
  constructor(
    @inject(LoggerService) private loggerService: LoggerService,
  ) { }

  public async getAnswers(questionId: number): Promise<Answer[]> {
    try {
      const answers: Answer[] = await QuizAnswersModel.findAll({
        where: {
          questionId
        }
      });

      return answers;
    } catch {
      const error = technicalErr.answerRepository_Implementation.getAnswers.msg;

      this.loggerService.errorLog(error);
      throw new Error(error);
    }
  }

  public async getRightAnswers(questionId: number): Promise<Answer[]> {
    try {
      const answers: Answer[] = await QuizAnswersModel.findAll({
        where: {
          questionId,
          isCorrect: 1
        }
      });

      return answers;
    } catch {
      const error = technicalErr.answerRepository_Implementation.getRightAnswers.msg;

      this.loggerService.errorLog(error);
      throw new Error(error);
    }
  }
}
