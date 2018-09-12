import { inject, injectable } from 'inversify';

import { LoggerService } from '../logger';

import { UserRepository } from './user.repository';

import { User} from '../../model';

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
        } catch (error) {
            this.loggerService.errorLog(error);
            throw error;
        }
    }

    public async addUserToUserTable(userToken: string): Promise<boolean> {
        try {
            const isAdd = await this.userRepository.addUserToUserTable(userToken);

            return isAdd;
        } catch (error) {
            this.loggerService.errorLog(error);
            throw error;
        }
    }
}
