import { injectable, inject } from 'inversify';

import { LoggerService } from '../logger/logger.service';
import { Question, UnAnsweredQuestion } from '../../model';
import { QuestionMarkModel, QuizQuestionsModel } from 'models';

import { QuestionRepository } from './question.repository';

@injectable()
export class QuestionRepositoryImplementation implements QuestionRepository {
  constructor(
    @inject(LoggerService) private loggerService: LoggerService,
  ) { }

  public async checkQuestionMarkTableForNewUser(userId: number): Promise<number> {
    try {
      const count = await QuestionMarkModel.count({
        where: {
          userId
        }
      });

      return count;
    } catch (error) {
      this.loggerService.errorLog(error);
      throw error;
    }
  }

  public async getUnansweredQuestions(userId: number): Promise<UnAnsweredQuestion[]> {
    try {
      const questions: UnAnsweredQuestion[] = await QuestionMarkModel.findAll({
        where: {
          userId,
          status: 0
        }
      });

      return questions;
    } catch (error) {
      this.loggerService.errorLog(error);
      throw error;
    }
  }

  public async getQuestions(): Promise<Question[]> {
    try {
      const questions: Question[] = await QuizQuestionsModel.findAll();

      return questions;
    } catch (error) {
      this.loggerService.errorLog(error);
      throw error;
    }
  }

  public async getQuestion(id: number): Promise<Question> {
    try {
      const question: Question = await QuizQuestionsModel.findOne({
        where: { id }
      });

      return question;
    } catch (error) {
      this.loggerService.errorLog(error);
      throw error;
    }
  }

  public async getQuestionId(question: string): Promise<Question> {
    try {
      const necessaryQuestion: Question = await QuizQuestionsModel.findOne({
        where: {
          question
        }
      });

      return necessaryQuestion;
    } catch (error) {
      this.loggerService.errorLog(error);
      throw error;
    }
  }

  public async updateQuestionMarkTable(userId: number, questionId: number): Promise<boolean> {
    try {
      const isUpdate = await QuestionMarkModel.update({ status: 1 }, {
        where: {
          userId,
          questionId
        }
      });

      if (isUpdate) {
        return true;
      }

      return false;
    } catch (error) {
      this.loggerService.errorLog(error);
      throw error;
    }
  }

  public async addUserToQuestionMarkTable(userId: number, questionsId: number[]): Promise<boolean> {
    const dataToDB = questionsId.map((questionId) => {
      return {
        userId,
        questionId,
        status: false
      };
    });

    try {
      await QuestionMarkModel.bulkCreate(dataToDB);

      return true;
    } catch (error) {
      this.loggerService.errorLog(error);
      throw error;
    }
  }
}
