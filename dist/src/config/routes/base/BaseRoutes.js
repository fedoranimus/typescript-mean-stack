"use strict";
const express = require('express');
const UserRoutes_1 = require('../UserRoutes');
const AuthRoutes_1 = require('../AuthRoutes');
class BaseRoutes {
    constructor() {
        this.app = express();
    }
    get routes() {
        this.app.use("/api/user/", new UserRoutes_1.UserRoutes().routes);
        this.app.use("/auth/", new AuthRoutes_1.AuthRoutes().routes);
        return this.app;
    }
}
exports.BaseRoutes = BaseRoutes;
