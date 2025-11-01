
import httpStatusCode from "http-status-codes";

import { JwtPayload } from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import { ITemplate } from "./template.interface";
import { Template } from "./template.model";

const createTemplateService =async(payload : Partial<ITemplate>)=>{
  const template = await Template.create(payload);
  return template;
}

const getMyTemplatesService =async(userId : string)=>{
    
    const templates = await Template.find({userId});
    const total = await Template.countDocuments({userId});
    return {
        templates,
        meta : {total}
    };
}

export const templateServices ={
    createTemplateService,
    getMyTemplatesService
}