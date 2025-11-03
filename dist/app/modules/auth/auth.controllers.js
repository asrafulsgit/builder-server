"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const asyncHandler_1 = require("../../utils/asyncHandler");
const auth_services_1 = require("./auth.services");
const setAuthTokens_1 = require("../../utils/setAuthTokens");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const authLoginController = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const user = await auth_services_1.authServices.authLoginService(req.body);
    (0, setAuthTokens_1.setAuthTokens)(res, user);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'User logged in successful',
        data: user.user
    });
});
const authLogoutController = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    });
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'User logout successfull',
        data: null
    });
});
exports.authController = {
    authLoginController,
    authLogoutController,
};
