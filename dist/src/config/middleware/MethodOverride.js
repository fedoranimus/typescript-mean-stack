"use strict";
const methodOverride = require("method-override");
const express = require("express");
class MethodOverride {
    static configuration() {
        let app = express();
        app.use(methodOverride("X-HTTP-Method"));
        app.use(methodOverride("X-HTTP-Method-Override"));
        app.use(methodOverride("X-Method-Override"));
        app.use(methodOverride("_method"));
        return app;
    }
}
exports.MethodOverride = MethodOverride;
