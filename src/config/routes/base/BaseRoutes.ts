import * as express from 'express';
import {UserRoutes} from '../UserRoutes';
import {AuthRoutes} from '../AuthRoutes';


export class BaseRoutes {
    private app = express();

    constructor() {}

    get routes(): express.Express {
        this.app.use("/api/user/", new UserRoutes().routes);
        this.app.use("/auth/", new AuthRoutes().routes);
        return this.app;
    }
}