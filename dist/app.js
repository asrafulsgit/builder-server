"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const globalError_1 = require("./app/middlewares/globalError");
const notFound_1 = require("./app/middlewares/notFound");
const routes_1 = require("./app/routes/routes");
const env_1 = require("./app/config/env");
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: env_1.envs.FRONTENT_URL,
    credentials: true
}));
app.use('/api/v1', routes_1.router);
app.use(globalError_1.globalErrorHandle);
app.use(notFound_1.notFoundHandler);
exports.default = app;
