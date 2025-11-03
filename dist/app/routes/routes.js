"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_router_1 = require("../modules/user/user.router");
const auth_router_1 = require("../modules/auth/auth.router");
const template_router_1 = require("../modules/template/template.router");
exports.router = (0, express_1.Router)();
const routes = [
    {
        path: '/user',
        route: user_router_1.userRouter
    }, {
        path: '/auth',
        route: auth_router_1.authRouter
    }, {
        path: '/template',
        route: template_router_1.templateRouter
    }
];
routes.forEach((route) => {
    exports.router.use(route.path, route.route);
});
