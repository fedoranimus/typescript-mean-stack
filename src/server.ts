import * as express from 'express';
import { Middleware } from './config/middleware/Middleware';
import environment from './environment';
import * as mongoose from 'mongoose';
mongoose.Promise = global.Promise;

class Server {

    public app: express.Application;

    public static bootstrap(): Server {
        return new Server();
    }

    constructor() {
        this.app = express();

        // configure server, mongoose & middleware
        this.config();

        // start server
        this.startServer();
    }

    private config() {
        this.app.use(Middleware.configuration);

        mongoose.connection.once('open', () => {
            console.log('Connected to Mongoose at', environment.mongoConnectionString);
        });

        mongoose.connect(environment.mongoConnectionString);
    }

    private startServer() {
        const server = this.app.listen(environment.port, environment.address, () => {
            const {address, port} = server.address();
            console.log('Listening on http://' + address + ':' + port);
        });
    }
}

let server = Server.bootstrap();
export = server.app;