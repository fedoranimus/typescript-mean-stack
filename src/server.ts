import * as express from 'express';
import environment from './environment';

class Server {

    public app: express.Application;

    public static bootstrap(): Server {
        return new Server();
    }

    constructor() {
        this.app = express();

        this.startServer();
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