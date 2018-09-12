import 'reflect-metadata';

import { InversifyExpressServer } from 'inversify-express-utils';

import bodyParser from 'body-parser';
import morgan from 'morgan';
import passport from 'passport';
import cors from 'cors';

import {
    LoggerService,
    LoggerServiceImplementation,
} from './service';

import './controller';
import { CONTAINER } from './service/services-registration';

const server = new InversifyExpressServer(CONTAINER);

import { db } from '../models/SequelizeConnect';
import config from './config/app.config.json';

db.connect.sync({
    logging: console.log
});

server.setConfig((app) => {
    process.env.NODE_ENV !== config.production ? app.use(morgan('dev')) : app.use(morgan('prod'));

    app.use(cors());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(passport.initialize());
    app.use(bodyParser.json());
});

const logger: LoggerService = new LoggerServiceImplementation();
const application = server.build();

application.listen(config.port, () => {
    logger.infoLog(`App is running at http://localhost:${config.port}`);
    logger.infoLog('Press CTRL+C to stop\n');
});
