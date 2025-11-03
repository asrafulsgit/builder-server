"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_controllers_1 = require("./auth.controllers");
const router = (0, express_1.Router)();
router.post('/login', auth_controllers_1.authController.authLoginController);
router.get('/logout', auth_controllers_1.authController.authLogoutController);
exports.authRouter = router;
