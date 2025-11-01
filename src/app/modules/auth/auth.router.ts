
import {Router } from "express";
import { authController } from "./auth.controllers";


const router = Router();

router.post('/login',authController.authLoginController);
router.get('/logout',authController.authLogoutController);


export const authRouter = router;