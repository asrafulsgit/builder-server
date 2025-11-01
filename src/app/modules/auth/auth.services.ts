

import { User } from "../user/user.model";
import httpStatusCode from 'http-status-codes';
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from "jsonwebtoken";
import { envs } from "../../config/env";
import { IUser } from "../user/user.interface";
import AppError from "../../middlewares/appError";
import { generateToken } from "../../utils/generateToken";


const authLoginService = async(payload : Partial<IUser>)=>{
    const {email,password}= payload;

    const isUserExist = await User.findOne({email});

    if(!isUserExist){ 
        throw new AppError(httpStatusCode.NOT_FOUND,"User is not found.");
    }

    const isCorrectPassword = await bcrypt.compare(password as string,isUserExist.password as string);
   
    if(!isCorrectPassword){ 
        throw new AppError(httpStatusCode.BAD_REQUEST,"Incorrect password.");
    }
    const jwtPayload = {
        id : isUserExist._id,
        email : isUserExist.email
    }
    const token = generateToken(jwtPayload,envs.JWT_ACCESS_TOKEN_SECRET,envs.JWT_ACCESS_TOKEN_EXPIRESIN);
    const user = isUserExist.toObject();

    return {
        accessToken : token,
        user :{
            _id : user._id,
            name : user.name,
            email : user.email
        }
    };
}





export const authServices = {
    authLoginService
}
