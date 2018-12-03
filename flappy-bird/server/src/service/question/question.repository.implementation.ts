import { injectable, inject } from 'inversify';

import { LoggerService } from '../logger';
import { Question, QuestionMarkTableRow, Answer } from 'model';
import { QuestionMarkModel, QuizQuestionsModel, QuizAnswersModel } from 'models';

import { QuestionRepository } from './question.repository';
import { technicalErr } from 'errors';

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
        status: false,
        session: false,
        isRight: false
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

  public async getUnansweredQuestions(userId: number): Promise<QuestionMarkTableRow[]> {
    try {
      const questions: QuestionMarkTableRow[] = await QuestionMarkModel.findAll({
        where: {
          userId,
          status: 0,
          session: 0
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

  public async getQuestionById(id: number): Promise<Question> {
    try {
      const question: Question = await QuizQuestionsModel.findOne({
        where: {
          id
        }
      });

      return question;
    } catch {
      const error = technicalErr.questionRepository_Implementation.getQuestionById.msg;

      this.loggerService.errorLog(error);
      throw new Error(error);
    }
  }

  public async getQuestion(questionId: number, userId: number): Promise<Question> {
    try {
      const question: Question = await QuizQuestionsModel.findOne({
        where: { id: questionId }
      });

      const isUpdate = await QuestionMarkModel.update({ status: 1, session: 1 }, {
        where: {
          userId,
          questionId
        }
      });

      if (isUpdate) {
        return question;
      }

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

  public async getUserRightAnswers(userId: number): Promise<QuestionMarkTableRow[]> {
    try {
      const myRightAnswers = await QuestionMarkModel.findAll({
        where: {
          userId,
          isRight: 1
        }
      });

      return myRightAnswers;
    } catch {
      const error = technicalErr.questionRepository_Implementation.getUserRightAnswers.msg;

      this.loggerService.errorLog(error);
      throw new Error(error);
    }
  }

  public async getSizeOfQuiz(userId: number): Promise<number> {
    try {
      const sizeOfQuiz = await QuestionMarkModel.count({
        where: {
          userId,
          session: 1
        }
      });

      return sizeOfQuiz;
    } catch {
      const error = technicalErr.questionRepository_Implementation.getSizeOfQuiz.msg;

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

  public async markCorrectAnswer(userId: number, questionId: number): Promise<boolean> {
    try {
      const isUpdate = await QuestionMarkModel.update({ isRight: 1 }, {
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

  public async refreshSession(userId: number): Promise<boolean> {
    try {
      const isUpdate = await QuestionMarkModel.update({ session: 0, isRight: 0 }, {
        where: {
          userId
        }
      });

      if (isUpdate) {
        return true;
      }

      return false;
    } catch {
      const error = technicalErr.questionRepository_Implementation.refreshSession.msg;

      this.loggerService.errorLog(error);
      throw new Error(error);
    }
  }

  public async getAllUsersAnswers(userId: number): Promise<QuestionMarkTableRow[]> {
    try {
      const allUserAnswers = await QuestionMarkModel.findAll({
        where: {
          userId,
          session: 1
        }
      });

      return allUserAnswers;
    } catch {
      const error = technicalErr.questionRepository_Implementation.getUserRightAnswers.msg;

      this.loggerService.errorLog(error);
      throw new Error(error);
    }
  }

  public async getAllAnswers(): Promise<Answer[]> {
    try {
      const allAnswers: any = {};
      await QuizAnswersModel.findAll({
        where: {
          isCorrect: 1
        }
      })
        .each((item: Answer) => {
          if (!allAnswers[item.questionId]) {
            allAnswers[item.questionId] = { answers: [] };
          }
          allAnswers[item.questionId].answers.push(item.answer);
        });

      return Object.keys(allAnswers)
        .map((key) => ({
          questionId: key,
          answers: allAnswers[key].answers
        })) as any
    } catch {
      const error = technicalErr.questionRepository_Implementation.getUserRightAnswers.msg;

      this.loggerService.errorLog(error);
      throw new Error(error);
    }
  }
}
