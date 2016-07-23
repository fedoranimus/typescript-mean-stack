"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const morgan = require('morgan');
const MethodOverride_1 = require('./MethodOverride');
const BaseRoutes_1 = require('../routes/base/BaseRoutes');
class Middleware {
    static get configuration() {
        let app = express();
        app.use(compression());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(MethodOverride_1.MethodOverride.configuration());
        app.use(cors());
        app.use(morgan('dev'));
        app.use(new BaseRoutes_1.BaseRoutes().routes);
        return app;
    }
}
exports.Middleware = Middleware;
