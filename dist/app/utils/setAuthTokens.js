"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthTokens = void 0;
const setAuthTokens = (res, tokens) => {
    if (tokens.accessToken) {
        res.cookie("accessToken", tokens.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });
    }
};
exports.setAuthTokens = setAuthTokens;
