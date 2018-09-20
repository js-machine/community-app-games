import { inject, injectable } from 'inversify';

import { LoggerService } from '../logger';
import { UserService } from '../user';
import { QuestionService } from '../question';

import { technicalErr } from 'errors';

@injectable()
export class StartGameService {
    constructor(
        @inject(LoggerService) private loggerService: LoggerService,
        @inject(QuestionService) private questionService: QuestionService,
        @inject(UserService) private userService: UserService,
    ) { }

    public async startGame(userToken: string): Promise<boolean> {
        let userId: number;
        let count: number;
        let questionsId: number[];
        let isAddUserToQuestionMarkTable: boolean = false;
        let isAddUserToUserTable: boolean = false;

        try {
            userId = (await this.userService.getUser(userToken)).id;
        } catch {
            const error = technicalErr.userService.getUser.msg;

            this.loggerService.errorLog(error);
        }

        if (!userId) {
            try {
                isAddUserToUserTable = await this.userService.addUserToUserTable(userToken);
            } catch {
                const error = technicalErr.userService.addUserToUserTable.msg;

                this.loggerService.errorLog(error);
                throw new Error(error);
            }

            try {
                userId = (await this.userService.getUser(userToken)).id;
            } catch {
                const error = technicalErr.userService.getUser.msg;

                this.loggerService.errorLog(error);
                throw new Error(error);
            }
        }

        try {
            count = await this.questionService.checkQuestionMarkTableForNewUser(userId);
        } catch {
            const error = technicalErr.questionService.checkQuestionMarkTableForNewUser.msg;

            this.loggerService.errorLog(error);
            throw new Error(error);
        }

        if (count < 1) {
            try {
                questionsId = (await this.questionService.getQuestions()).map((question) => question.id);
            } catch {
                const error = technicalErr.questionService.getQuestions.msg;

                this.loggerService.errorLog(error);
                throw new Error(error);
            }

            try {
                isAddUserToQuestionMarkTable = await this.questionService.addUserToQuestionMarkTable(userId, questionsId);
            } catch {
                const error = technicalErr.questionService.addUserToQuestionMarkTable.msg;

                this.loggerService.errorLog(error);
                throw new Error(error);
            }
        }

        return isAddUserToQuestionMarkTable;
    }
}
