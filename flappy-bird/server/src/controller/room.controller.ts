import { controller, httpPost } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { AppTokenService } from 'service/app-token';
import { RoomService } from 'service/room';

import { inject } from 'inversify';
import { technicalErr } from 'errors';

@controller('/api')
export class RoomController {
    public constructor(
        @inject(AppTokenService) private appTokenService: AppTokenService,
        @inject(RoomService) private roomService: RoomService) {
    }

    @httpPost('/start-new-room')
    public async startNewRoom(request: Request, response: Response): Promise<void | Response> {
        try {
            const appToken = 'Bearer ' + (await this.appTokenService.getAppToken()).token;

            if (request.headers.authorization === appToken) {
                const roomToken = this.roomService.createToken();
                response.status(200).send(roomToken);
            } else {
                response.status(401).send(technicalErr.differentToken.msg);
            }
        } catch (err) {
            return response.status(400)
                .json(technicalErr.applicationTokenRepository.getAppToken.msg);
        }
    }
}
