import express, { type Application } from "express";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { globalErrorHandle } from "./app/middlewares/globalError";
import { notFoundHandler } from "./app/middlewares/notFound";


const app : Application = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());




app.use(globalErrorHandle);
app.use(notFoundHandler);

export default app;