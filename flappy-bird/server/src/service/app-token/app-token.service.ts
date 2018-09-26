import { inject, injectable } from 'inversify';
import { AppTokenRepositoryImplementation } from './app-token.repository';
import { AppToken } from 'model';
import { LoggerService } from '../logger';

import { technicalErr } from 'errors';

@injectable()
export class AppTokenService {

    public constructor(
        @inject(LoggerService) private loggerService: LoggerService,
        @inject(AppTokenRepositoryImplementation) private appTokenRepositoryImplementation: AppTokenRepositoryImplementation) {
    }

    public async getAppToken(): Promise<AppToken> {
        try {
            const token = await this.appTokenRepositoryImplementation.getAppToken();

            return token;
        } catch {
            const error = technicalErr.applicationTokenRepository_Implementation.getAppToken.msg;

            this.loggerService.errorLog(error);
            throw new Error(error);
        }

    }

    public async saveAppToken(appToken: string): Promise<boolean> {
        try {
            const isSave = await this.appTokenRepositoryImplementation.saveAppToken(appToken);

            return true;
        } catch {
            const error = technicalErr.applicationTokenRepository_Implementation.saveAppToken.msg;

            this.loggerService.errorLog(error);
            throw new Error(error);
        }
    }
}
