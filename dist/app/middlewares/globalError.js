"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandle = void 0;
const env_1 = require("../config/env");
const appError_1 = __importDefault(require("./appError"));
const globalErrorHandle = async (err, req, res, next) => {
    let statusCode = 500;
    let message = `Something went wrong!`;
    //mongoose duplicate error
    if (err.code === 11000) {
        statusCode = 400;
        const duplicate = err.message.match(/"([^"]*)"/)[1];
        message = `${duplicate} already exist!`;
    }
    //mongoose CastError 
    else if (err.name === 'CastError') {
        statusCode = 400;
        message = 'Invalid mongoDB object ID, Please provide valid ID.';
    }
    //mongoose ValidationError
    else if (err.name === "ValidationError") {
        statusCode = 400;
        message = "Invalid Input";
    }
    // custom error 
    else if (err instanceof appError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
    }
    // server error 
    else if (err instanceof Error) {
        statusCode = 500;
        message = err.message;
    }
    res.status(statusCode).json({
        success: false,
        message,
        err,
        stack: env_1.envs.NODE_ENV === 'development' ? err.stack : null
    });
};
exports.globalErrorHandle = globalErrorHandle;
