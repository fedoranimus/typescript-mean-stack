"use strict";
const express_1 = require('express');
class AuthRoutes {
    constructor() {
        this.router = express_1.Router();
    }
    get routes() {
        return this.router;
    }
}
exports.AuthRoutes = AuthRoutes;
