import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import * as morgan from 'morgan';

import { MethodOverride } from './MethodOverride';
import { BaseRoutes } from '../routes/base/BaseRoutes';

export class Middleware {

    static get configuration(): express.Express {
        let app = express();

        app.use(compression());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false}));
        app.use(MethodOverride.configuration());
        app.use(cors());
        app.use(morgan('dev'));
        app.use(new BaseRoutes().routes);

        return app;
    }
}