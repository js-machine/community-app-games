import { inject, injectable } from 'inversify';
import { AppTokenRepository } from './app-token.repository';
import { AppToken } from 'model';
@injectable()
export class AppTokenService {

    public constructor(
        @inject(AppTokenRepository) private appTokenRepository: AppTokenRepository) {
    }

    public async getAppToken(): Promise<AppToken> {
        const token = await this.appTokenRepository.getAppToken();

        return token;
    }
}
