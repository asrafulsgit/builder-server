
import httpStatusCode from "http-status-codes";
 
import { ITemplate } from "./template.interface";
import { Template } from "./template.model";
import AppError from "../../middlewares/appError";

const createTemplateService =async(payload : Partial<ITemplate>,userId : string)=>{
  const template = await Template.create({
    userId,
    ...payload
  });
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

const getSingleTemplateService =async(userId : string,templateId : string)=>{
    const template = await Template.findOne({_id : templateId,userId});
    if(!template){
        throw new AppError(httpStatusCode.NOT_FOUND,"Project not found.")
    }
    return template;
}

export const templateServices ={
    createTemplateService,
    getMyTemplatesService,
    getSingleTemplateService
}