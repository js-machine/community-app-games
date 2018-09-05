import { controller, httpGet } from 'inversify-express-utils';
import { Request, Response } from 'express';

@controller('/api')
export class StatisticController {

    @httpGet('/test')
    public async getTest(request: Request, response: Response): Promise<void | Response> {
        return response.send('TEST');
    }
}
