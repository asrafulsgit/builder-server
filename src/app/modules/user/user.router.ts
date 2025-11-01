
import { Router } from "express";
import { userControllers } from "./user.controllers";
import { authentication } from "../../middlewares/authentication.middleware";


const router = Router();

router.post('/signup',userControllers.createUser);
router.get('/observer',authentication(),userControllers.userObserver);

export const userRouter = router;