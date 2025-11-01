import express, { type Application } from "express";
import cookieParser from 'cookie-parser';
import cors from 'cors';


const app : Application = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());




export default app;