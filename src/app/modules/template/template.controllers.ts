import { NextFunction, Request, Response } from "express";
import httpStatusCode from 'http-status-codes';
import { templateServices } from "./template.services";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";


const createTemplate = asyncHandler(async(req : Request, res : Response,next : NextFunction)=>{
    const user = req.user as JwtPayload;
    const template = await templateServices.createTemplateService(req.body,user.id as string);

    sendResponse(res,{
        statusCode : httpStatusCode.CREATED,
        success : true,
        message : 'Template created',
        data : template
    });
});

const getMyTemplates = asyncHandler(async(req : Request, res : Response,next : NextFunction)=>{
    const user = req.user as JwtPayload;
    const templates = await templateServices.getMyTemplatesService(user.id as string);

    sendResponse(res,{
        statusCode : httpStatusCode.CREATED,
        success : true,
        message : 'Templates retrived',
        data : templates
    });
});


export const templateControllers = {
    createTemplate,
    getMyTemplates
}