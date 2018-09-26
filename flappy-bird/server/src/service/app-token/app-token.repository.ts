import { injectable, inject } from 'inversify';

import { LoggerService } from '../logger';
import { AppTokenModel } from '../../../models';

import { technicalErr } from 'errors';
import { AppToken } from 'model';
@injectable()
export class AppTokenRepositoryImplementation {

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
            const error = technicalErr.applicationTokenRepository_Implementation.getAppToken.msg;

            this.loggerService.errorLog(error);
            throw new Error(error);
        }
    }

    public async saveAppToken(token: string): Promise<boolean> {
        try {
            await AppTokenModel.upsert({
                id: 1,
                token
            });

            return true;
        } catch {
            const error = technicalErr.applicationTokenRepository_Implementation.saveAppToken.msg;

            this.loggerService.errorLog(error);
            throw new Error(error);
        }
    }
}
