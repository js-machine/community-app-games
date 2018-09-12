import { injectable, inject } from 'inversify';
import { LoggerService } from '../logger';

import { UserModel, QuestionMarkModel } from 'models';
import { User } from '../../model';

import { UserRepository } from './user.repository';

@injectable()
export class UserRepositoryImplementation implements UserRepository {
  constructor(
    @inject(LoggerService) private loggerService: LoggerService,
  ) { }

  public async getUser(userToken: string): Promise<User> {
    try {
      const user = await UserModel.findOne({
        where: {
          userToken
        }
      });

      return user;
    } catch (error) {
      this.loggerService.errorLog(error);
      throw error;
    }
  }
}
