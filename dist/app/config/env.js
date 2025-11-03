"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const envsLoading = () => {
    const properties = [
        "MONGODB_URL",
        "PORT",
        "NODE_ENV",
        "JWT_ACCESS_TOKEN_SECRET",
        "JWT_ACCESS_TOKEN_EXPIRESIN",
        "BCRYPT_SALT",
        "FRONTENT_URL"
    ];
    properties.forEach((key) => {
        if (!process.env[key]) {
            throw new Error(`Missing env variable ${key}`);
        }
    });
    return {
        PORT: process.env.PORT,
        MONGODB_URL: process.env.MONGODB_URL,
        NODE_ENV: process.env.NODE_ENV,
        JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET,
        JWT_ACCESS_TOKEN_EXPIRESIN: process.env
            .JWT_ACCESS_TOKEN_EXPIRESIN,
        BCRYPT_SALT: process.env.BCRYPT_SALT,
        FRONTENT_URL: process.env.FRONTENT_URL
    };
};
exports.envs = envsLoading();
