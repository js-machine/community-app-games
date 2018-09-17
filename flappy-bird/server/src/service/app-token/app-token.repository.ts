import { injectable, inject } from 'inversify';

import { LoggerService } from '../logger/logger.service';
import { AppTokenModel } from '../../../models';

import { technicalErr } from '../../../errors';
@injectable()
export class AppTokenRepository {

    constructor(
        @inject(LoggerService) private loggerService: LoggerService,
    ) { }

    public async getAppToken(): Promise<string> {
        try {
            const token = await AppTokenModel.findAll();
            if (token.length !== 1) {
                throw new Error(`Application doesn't have unique token`);
            } else {
                return 'Bearer ' + token[0].dataValues.token;
            }
        } catch {
            const error = technicalErr.applicationTokenRepository.getAppToken.msg;

            this.loggerService.errorLog(error);
            throw new Error(error);
        }
    }
}
