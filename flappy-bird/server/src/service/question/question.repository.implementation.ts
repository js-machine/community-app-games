import { injectable, inject } from 'inversify';

import { LoggerService } from '../logger/logger.service';
import { Question, UnAnsweredQuestion } from '../../model';
import { QuestionMarkModel, QuizQuestionsModel } from 'models';

import { QuestionRepository } from './question.repository';
import { technicalErr } from './../../../errors';
@injectable()
export class QuestionRepositoryImplementation implements QuestionRepository {
  constructor(
    @inject(LoggerService) private loggerService: LoggerService,
  ) { }

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
    } catch {
      const error = technicalErr.questionRepository_Implementation.addUserToQuestionMarkTable.msg;

      this.loggerService.errorLog(error);
      throw new Error(error);
    }
  }

  public async checkQuestionMarkTableForNewUser(userId: number): Promise<number> {
    try {
      const count = await QuestionMarkModel.count({
        where: {
          userId
        }
      });

      return count;
    } catch {
      const error = technicalErr.questionRepository_Implementation.checkQuestionMarkTableForNewUser.msg;

      this.loggerService.errorLog(error);
      throw new Error(error);
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
    } catch {
      const error = technicalErr.questionRepository_Implementation.getUnansweredQuestions.msg;

      this.loggerService.errorLog(error);
      throw new Error(error);
    }
  }

  public async getQuestions(): Promise<Question[]> {
    try {
      const questions: Question[] = await QuizQuestionsModel.findAll();

      return questions;
    } catch {
      const error = technicalErr.questionRepository_Implementation.getQuestions.msg;

      this.loggerService.errorLog(error);
      throw new Error(error);
    }
  }

  public async getQuestion(id: number): Promise<Question> {
    try {
      const question: Question = await QuizQuestionsModel.findOne({
        where: { id }
      });

      return question;
    } catch {
      const error = technicalErr.questionRepository_Implementation.getQuestion.msg;

      this.loggerService.errorLog(error);
      throw new Error(error);
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
    } catch {
      const error = technicalErr.questionRepository_Implementation.getQuestionId.msg;

      this.loggerService.errorLog(error);
      throw new Error(error);
    }
  }

  public async refreshUserAnswersQuestionMarkTable(userId: number): Promise<boolean> {
    try {
      const isUpdate = await QuestionMarkModel.update({ status: 0 }, {
        where: {
          userId
        }
      });

      if (isUpdate) {
        return true;
      }

      return false;
    } catch {
      const error = technicalErr.questionRepository_Implementation.refreshUserAnswersQuestionMarkTable.msg;

      this.loggerService.errorLog(error);
      throw new Error(error);
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
    } catch {
      const error = technicalErr.questionRepository_Implementation.updateQuestionMarkTable.msg;

      this.loggerService.errorLog(error);
      throw new Error(error);
    }
  }
}
