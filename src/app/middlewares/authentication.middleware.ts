import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import httpStatusCode from "http-status-codes";
import { envs } from "../config/env";
import AppError from "./appError";
import { User } from "../modules/user/user.model";


export const authentication =() => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies.accessToken  || req.headers.authorization;
      
      if (!token){
        throw new AppError(httpStatusCode.NOT_FOUND, "Token not found.");
}
      const verified = jwt.verify(
        token,
        envs.JWT_ACCESS_TOKEN_SECRET
      ) as JwtPayload;

      const isUserExist = await User.findById(verified.id);

      if (!isUserExist) {
        throw new AppError(httpStatusCode.NOT_FOUND, "User not found");
      }
      req.user = verified;
      next();
    } catch (error) {
      next(error);
    }
  };
