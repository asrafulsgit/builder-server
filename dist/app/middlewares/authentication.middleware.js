"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const env_1 = require("../config/env");
const appError_1 = __importDefault(require("./appError"));
const user_model_1 = require("../modules/user/user.model");
const authentication = () => async (req, res, next) => {
    try {
        const token = req.cookies.accessToken || req.headers.authorization;
        if (!token) {
            throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, "Token not found.");
        }
        const verified = jsonwebtoken_1.default.verify(token, env_1.envs.JWT_ACCESS_TOKEN_SECRET);
        const isUserExist = await user_model_1.User.findById(verified.id);
        if (!isUserExist) {
            throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, "User not found");
        }
        req.user = verified;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.authentication = authentication;
