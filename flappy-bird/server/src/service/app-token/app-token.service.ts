import { inject, injectable } from 'inversify';
import { AppTokenRepository } from './app-token.repository';

@injectable()
export class AppTokenService {

    public constructor(@inject(AppTokenRepository) private appTokenRepository: AppTokenRepository) {
    }

    public async getByAppName(): Promise<string> {
        return this.appTokenRepository.getAppToken();
    }
}
