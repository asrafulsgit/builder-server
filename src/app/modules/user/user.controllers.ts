import { NextFunction, Request, Response } from "express";
import httpStatusCode from 'http-status-codes';
import { userServices } from "./user.services";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";

const createUser = asyncHandler(async(req : Request, res : Response,next : NextFunction)=>{
 
    await userServices.userCreateService(req.body);

    sendResponse(res,{
        statusCode : httpStatusCode.CREATED,
        success : true,
        message : 'User created',
        data : null
    });
});

const userObserver = asyncHandler(async(req : Request, res : Response,next : NextFunction)=>{
    const user = req.user as JwtPayload;
    const data = await userServices.userObserverService(user.id as string);

    sendResponse(res,{
        statusCode : httpStatusCode.OK,
        success : true,
        message : 'Authorized user',
        data  
    });
});


export const userControllers = {
    createUser,
    userObserver
}