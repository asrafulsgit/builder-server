
import { User } from "./user.model";
import httpStatusCode from "http-status-codes";
import { envs } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import AppError from "../../middlewares/appError";
import { IUser } from "./user.interface";

const userCreateService =async(payload : Partial<IUser>)=>{
    const {email,password,...rest}= payload;

    const isUserExist = await User.findOne({email});

    if(isUserExist){ 
        throw new AppError(httpStatusCode.BAD_REQUEST,"User Already Exist.");
    }

    const hashPassword = await bcrypt.hash(password as string,Number(envs.BCRYPT_SALT));

   
    await User.create({
            email,
            password : hashPassword,
            ...rest
        });
}

const userObserverService =async(userId : string)=>{
    

    const isUserExist = await User.findById(userId);

    if(!isUserExist){ 
        throw new AppError(httpStatusCode.BAD_REQUEST,"User Already Exist.");
    }
    
    return {
        _id : isUserExist._id,
            name : isUserExist.name,
            email : isUserExist.email
    }
}

 

export const userServices ={
    userCreateService,
    userObserverService
}