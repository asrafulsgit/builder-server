import express, { type Application } from "express";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { globalErrorHandle } from "./app/middlewares/globalError";
import { notFoundHandler } from "./app/middlewares/notFound";
import { router } from "./app/routes/routes";
import { envs } from "./app/config/env";


const app : Application = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin : envs.FRONTENT_URL,
    credentials : true
}));


app.use('/api/v1',router)


app.use(globalErrorHandle);
app.use(notFoundHandler);

export default app;