"use strict";
const express = require('express');
const Middleware_1 = require('./config/middleware/Middleware');
const environment_1 = require('./environment');
class Server {
    constructor() {
        this.app = express();
        // configure server & middleware
        this.config();
        // start server
        this.startServer();
    }
    static bootstrap() {
        return new Server();
    }
    config() {
        this.app.use(Middleware_1.Middleware.configuration);
    }
    startServer() {
        const server = this.app.listen(environment_1.default.port, environment_1.default.address, () => {
            const { address, port } = server.address();
            console.log('Listening on http://' + address + ':' + port);
        });
    }
}
let server = Server.bootstrap();
module.exports = server.app;
