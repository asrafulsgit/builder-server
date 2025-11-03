import { Response } from "express"; 
import { envs } from "../config/env";

export interface AuthTokens {
  accessToken?: string;
}

export const setAuthTokens = (res: Response, tokens: AuthTokens) => {
  if (tokens.accessToken) {
    res.cookie("accessToken", tokens.accessToken, {
      httpOnly: true,
      secure: envs.NODE_ENV === 'production',
      sameSite : "none"
    });
  }
};
