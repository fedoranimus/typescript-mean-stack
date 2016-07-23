"use strict";
const express = require('express');
class Server {
    constructor() {
        this.app = express();
        this.startServer();
    }
    static bootstrap() {
        return new Server();
    }
    startServer() {
        const server = this.app.listen(3000, "localhost", () => {
            const { address, port } = server.address();
            console.log('Listening on http://' + address + ':' + port);
        });
    }
}
let server = Server.bootstrap();
module.exports = server.app;
