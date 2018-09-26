import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';

import { AnswerRepository, AnswerRepositoryImplementation, AnswerService } from './answer';

import { AppTokenService, AppTokenRepositoryImplementation } from './app-token';
import { GameRepository, GameRepositoryImplementation, GameService } from './game';
import { GetResultRepository, GetResultRepositoryImplementation, GetResultService } from './get-result';
import { LoggerService, LoggerServiceImplementation } from './logger';
import { PlayerBindRepository, PlayerBindRepositoryImplementation, PlayersBindService} from './players-bind';
import { QuestionRepository, QuestionRepositoryImplementation, QuestionService} from './question';
import { QuizRepository, QuizRepositoryImplementation, QuizService} from './quiz';
import { RoomRepository, RoomRepositoryImplementation, RoomService } from './room';
import { SaveAnswerRepository, SaveAnswerRepositoryImplementation, SaveAnswerService} from './save-answer';
import { SendResultRepository, SendResultRepositoryImplementation, SendResultService} from './send-result';
import { StartGameRepository, StartGameRepositoryImplementation, StartGameService} from './start-game';
import { UserRepository, UserRepositoryImplementation, UserService} from './user';

export const CONTAINER = new Container();

CONTAINER.bind<AnswerService>(AnswerService).to(AnswerService);
CONTAINER.bind<AppTokenService>(AppTokenService).to(AppTokenService);
CONTAINER.bind<GameService>(GameService).to(GameService);
CONTAINER.bind<GetResultService>(GetResultService).to(GetResultService);
CONTAINER.bind<LoggerService>(LoggerService).to(LoggerServiceImplementation);
CONTAINER.bind<PlayersBindService>(PlayersBindService).to(PlayersBindService);
CONTAINER.bind<QuestionService>(QuestionService).to(QuestionService);
CONTAINER.bind<QuizService>(QuizService).to(QuizService);
CONTAINER.bind<RoomService>(RoomService).to(RoomService);
CONTAINER.bind<SaveAnswerService>(SaveAnswerService).to(SaveAnswerService);
CONTAINER.bind<StartGameService>(StartGameService).to(StartGameService);
CONTAINER.bind<SendResultService>(SendResultService).to(SendResultService);
CONTAINER.bind<UserService>(UserService).to(UserService);

CONTAINER.bind<AnswerRepository>(AnswerRepository).to(AnswerRepositoryImplementation);
CONTAINER.bind<AppTokenRepositoryImplementation>(AppTokenRepositoryImplementation).to(AppTokenRepositoryImplementation);
CONTAINER.bind<GameRepository>(GameRepository).to(GameRepositoryImplementation);
CONTAINER.bind<GetResultRepository>(GetResultRepository).to(GetResultRepositoryImplementation);
CONTAINER.bind<PlayerBindRepository>(PlayerBindRepository).to(PlayerBindRepositoryImplementation);
CONTAINER.bind<QuestionRepository>(QuestionRepository).to(QuestionRepositoryImplementation);
CONTAINER.bind<QuizRepository>(QuizRepository).to(QuizRepositoryImplementation);
CONTAINER.bind<RoomRepository>(RoomRepository).to(RoomRepositoryImplementation);
CONTAINER.bind<SaveAnswerRepository>(SaveAnswerRepository).to(SaveAnswerRepositoryImplementation);
CONTAINER.bind<SendResultRepository>(SendResultRepository).to(SendResultRepositoryImplementation);
CONTAINER.bind<StartGameRepository>(StartGameRepository).to(StartGameRepositoryImplementation);
CONTAINER.bind<UserRepository>(UserRepository).to(UserRepositoryImplementation);

export const inject = getDecorators(CONTAINER).lazyInject;
