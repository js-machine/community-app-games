import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';

import { AnswerRepository, AnswerRepositoryImplementation, AnswerService } from './answer';

import { AppTokenService, AppTokenRepository } from './app-token';
import { GameRepository, GameRepositoryImplementation, GameService } from './game';

import { LoggerService, LoggerServiceImplementation } from './logger';
import { PlayerBindRepository, PlayerBindRepositoryImplementation, PlayersBindService} from './players-bind';
import { QuestionRepository, QuestionRepositoryImplementation, QuestionService} from './question';
import { QuizRepository, QuizRepositoryImplementation, QuizService} from './quiz';
import { RoomRepository, RoomRepositoryImplementation, RoomService } from './room';
import { SendAnswerRepository, SendAnswerRepositoryImplementation, SendAnswerService} from './send-answer';
import { StartGameRepository, StartGameRepositoryImplementation, StartGameService} from './start-game';
import { UserRepository, UserRepositoryImplementation, UserService} from './user';

export const CONTAINER = new Container();

CONTAINER.bind<AnswerService>(AnswerService).to(AnswerService);
CONTAINER.bind<AppTokenService>(AppTokenService).to(AppTokenService);
CONTAINER.bind<GameService>(GameService).to(GameService);
CONTAINER.bind<LoggerService>(LoggerService).to(LoggerServiceImplementation);
CONTAINER.bind<PlayersBindService>(PlayersBindService).to(PlayersBindService);
CONTAINER.bind<QuestionService>(QuestionService).to(QuestionService);
CONTAINER.bind<QuizService>(QuizService).to(QuizService);
CONTAINER.bind<RoomService>(RoomService).to(RoomService);
CONTAINER.bind<SendAnswerService>(SendAnswerService).to(SendAnswerService);
CONTAINER.bind<StartGameService>(StartGameService).to(StartGameService);
CONTAINER.bind<UserService>(UserService).to(UserService);

CONTAINER.bind<AnswerRepository>(AnswerRepository).to(AnswerRepositoryImplementation);
CONTAINER.bind<AppTokenRepository>(AppTokenRepository).to(AppTokenRepository);
CONTAINER.bind<GameRepository>(GameRepository).to(GameRepositoryImplementation);
CONTAINER.bind<PlayerBindRepository>(PlayerBindRepository).to(PlayerBindRepositoryImplementation);
CONTAINER.bind<QuestionRepository>(QuestionRepository).to(QuestionRepositoryImplementation);
CONTAINER.bind<QuizRepository>(QuizRepository).to(QuizRepositoryImplementation);
CONTAINER.bind<RoomRepository>(RoomRepository).to(RoomRepositoryImplementation);
CONTAINER.bind<SendAnswerRepository>(SendAnswerRepository).to(SendAnswerRepositoryImplementation);
CONTAINER.bind<StartGameRepository>(StartGameRepository).to(StartGameRepositoryImplementation);
CONTAINER.bind<UserRepository>(UserRepository).to(UserRepositoryImplementation);

export const inject = getDecorators(CONTAINER).lazyInject;
