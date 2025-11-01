import { Router } from "express";
import { templateControllers } from "./template.controllers";
import { authentication } from "../../middlewares/authentication.middleware";



const router = Router();

router.post('/create',authentication(),templateControllers.createTemplate);
router.get('/my',authentication(),templateControllers.getMyTemplates);

export const templateRouter = router;