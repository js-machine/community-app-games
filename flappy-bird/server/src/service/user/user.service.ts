import { inject, injectable } from 'inversify';

import { LoggerService } from '../logger';

import { UserRepository } from './user.repository';

import { User} from 'model';

import { technicalErr } from 'errors';
@injectable()
export class UserService {
    constructor(
        @inject(LoggerService) private loggerService: LoggerService,
        @inject(UserRepository) private userRepository: UserRepository
    ) { }

    public async getUser(userToken: string): Promise<User> {
        try {
            const userId = await this.userRepository.getUser(userToken);

            return userId;
        } catch {
            const error = technicalErr.userRepository.getUser.msg;

            this.loggerService.errorLog(error);
            throw new Error(error);
        }
    }

    public async addUserToUserTable(userToken: string): Promise<boolean> {
        try {
            const isAdd = await this.userRepository.addUserToUserTable(userToken);

            return isAdd;
        } catch {
            const error = technicalErr.userRepository.addUserToUserTable.msg;

            this.loggerService.errorLog(error);
            throw new Error(error);
        }
    }
}
