import { injectable, inject } from 'inversify';
import { LoggerService } from '../logger';

import { UserModel } from 'models';
import { User } from '../../model';

import { UserRepository } from './user.repository';

import { technicalErr } from 'errors';

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
    } catch {
      const error = technicalErr.userRepository_Implementation.getUser.msg;

      this.loggerService.errorLog(error);
      throw new Error(error);
    }
  }

  public async addUserToUserTable(userToken: string): Promise<boolean> {
    let isAdd: boolean = false;
    try {
      isAdd = await UserModel.upsert({
        userToken
      });

      return isAdd;
    } catch {
      const error = technicalErr.userRepository_Implementation.addUserToUserTable.msg;

      this.loggerService.errorLog(error);
      throw new Error(error);
    }
  }
}
