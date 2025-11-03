"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const user_services_1 = require("./user.services");
const asyncHandler_1 = require("../../utils/asyncHandler");
const sendResponse_1 = require("../../utils/sendResponse");
const createUser = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    await user_services_1.userServices.userCreateService(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.CREATED,
        success: true,
        message: 'User created',
        data: null
    });
});
const userObserver = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const user = req.user;
    const data = await user_services_1.userServices.userObserverService(user.id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Authorized user',
        data
    });
});
exports.userControllers = {
    createUser,
    userObserver
};
