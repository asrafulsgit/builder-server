"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const user_model_1 = require("../user/user.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const env_1 = require("../../config/env");
const appError_1 = __importDefault(require("../../middlewares/appError"));
const generateToken_1 = require("../../utils/generateToken");
const authLoginService = async (payload) => {
    const { email, password } = payload;
    const isUserExist = await user_model_1.User.findOne({ email });
    if (!isUserExist) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, "User is not found.");
    }
    const isCorrectPassword = await bcryptjs_1.default.compare(password, isUserExist.password);
    if (!isCorrectPassword) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, "Incorrect password.");
    }
    const jwtPayload = {
        id: isUserExist._id,
        email: isUserExist.email
    };
    const token = (0, generateToken_1.generateToken)(jwtPayload, env_1.envs.JWT_ACCESS_TOKEN_SECRET, env_1.envs.JWT_ACCESS_TOKEN_EXPIRESIN);
    const user = isUserExist.toObject();
    return {
        accessToken: token,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email
        }
    };
};
exports.authServices = {
    authLoginService
};
