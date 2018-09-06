import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';

import { LoggerService, LoggerServiceImplementation } from './logger';
import { AppTokenService, AppTokenRepository} from './app-token';
import { RoomRepository, RoomRepositoryImplementation, RoomService} from './room';
import {
    PlayerBindRepository,
    PlayerBindRepositoryImplementation,
    PlayersBindService
} from './players-bind';

export const CONTAINER = new Container();

CONTAINER.bind<LoggerService>(LoggerService).to(LoggerServiceImplementation);
CONTAINER.bind<AppTokenService>(AppTokenService).to(AppTokenService);
CONTAINER.bind<RoomService>(RoomService).to(RoomService);
CONTAINER.bind<PlayersBindService>(PlayersBindService).to(PlayersBindService);

CONTAINER.bind<AppTokenRepository>(AppTokenRepository).to(AppTokenRepository);
CONTAINER.bind<RoomRepository>(RoomRepository).to(RoomRepositoryImplementation);
CONTAINER.bind<PlayerBindRepository>(PlayerBindRepository).to(PlayerBindRepositoryImplementation);

export const inject = getDecorators(CONTAINER).lazyInject;
