"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const user_model_1 = require("./user.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const env_1 = require("../../config/env");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const appError_1 = __importDefault(require("../../middlewares/appError"));
const userCreateService = async (payload) => {
    const { email, password, ...rest } = payload;
    const isUserExist = await user_model_1.User.findOne({ email });
    if (isUserExist) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, "User Already Exist.");
    }
    const hashPassword = await bcryptjs_1.default.hash(password, Number(env_1.envs.BCRYPT_SALT));
    await user_model_1.User.create({
        email,
        password: hashPassword,
        ...rest
    });
};
const userObserverService = async (userId) => {
    const isUserExist = await user_model_1.User.findById(userId);
    if (!isUserExist) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, "User Already Exist.");
    }
    return {
        _id: isUserExist._id,
        name: isUserExist.name,
        email: isUserExist.email
    };
};
exports.userServices = {
    userCreateService,
    userObserverService
};
