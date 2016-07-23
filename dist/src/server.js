"use strict";
const express = require('express');
const environment_1 = require('./environment');
class Server {
    constructor() {
        this.app = express();
        this.startServer();
    }
    static bootstrap() {
        return new Server();
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
