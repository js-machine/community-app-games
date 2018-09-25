import { injectable, inject } from 'inversify';

import { LoggerService } from '../logger';
import { AppTokenModel } from '../../../models';

import { technicalErr } from 'errors';
import { AppToken } from 'model';
@injectable()
export class AppTokenRepository {

    constructor(
        @inject(LoggerService) private loggerService: LoggerService,
    ) { }

    public async getAppToken(): Promise<AppToken> {
        try {
            const token = await AppTokenModel.findOne({
                where: {
                    id: 1
                }
            });

            return token;
        } catch {
            const error = technicalErr.applicationTokenRepository.getAppToken.msg;

            this.loggerService.errorLog(error);
            throw new Error(error);
        }
    }
}
