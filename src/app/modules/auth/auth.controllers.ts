import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { authServices } from "./auth.services";
import { setAuthTokens } from "../../utils/setAuthTokens";
import { sendResponse } from "../../utils/sendResponse";
import httpStatusCode from 'http-status-codes';

const authLoginController = asyncHandler(async(req : Request, res : Response,next : NextFunction)=>{
    const user = await authServices.authLoginService(req.body);
    setAuthTokens(res,user);
    sendResponse(res,{
        statusCode : httpStatusCode.OK,
        success : true,
        message : 'User logged in successful',
        data : user.user
    });
});




const authLogoutController = asyncHandler(async(req : Request, res : Response,next : NextFunction)=>{
    
    res.clearCookie('accessToken',{
        httpOnly : true,
        secure : true,
        sameSite : 'none'
    })
    
    sendResponse(res,{
        statusCode : httpStatusCode.OK,
        success : true,
        message : 'User logout successfull',
        data : null
    });
});


export const authController ={
    authLoginController,
    authLogoutController,
}
