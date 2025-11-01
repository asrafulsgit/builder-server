import { Response } from "express"; 

export interface AuthTokens {
  accessToken?: string;
}

export const setAuthTokens = (res: Response, tokens: AuthTokens) => {
  if (tokens.accessToken) {
    res.cookie("accessToken", tokens.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite : "none"
    });
  }
};
