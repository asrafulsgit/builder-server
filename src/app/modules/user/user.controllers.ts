import { NextFunction, Request, Response } from "express";
import httpStatusCode from 'http-status-codes';
import { userServices } from "./user.services";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/sendResponse";


const createUser = asyncHandler(async(req : Request, res : Response,next : NextFunction)=>{
 
    await userServices.userCreateService(req.body);

    sendResponse(res,{
        statusCode : httpStatusCode.CREATED,
        success : true,
        message : 'User created',
        data : null
    });
})


export const userControllers = {
    createUser
}