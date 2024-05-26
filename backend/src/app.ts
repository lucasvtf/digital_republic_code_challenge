import express from 'express';
import morgan from 'morgan';
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';
import paintController from './controller/paintController';
import { ErrorHandler } from './middleware/errorMiddleware';

const app = express();

app.use(morgan('tiny'));

app.use(helmet());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.use(express.json());

app.post('/calculate', paintController);

app.use(ErrorHandler);

export default app;
