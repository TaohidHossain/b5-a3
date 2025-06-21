import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import errorHandler from './app/middlewares/errorHandler';
import appAssert from './app/utils/appAssert';
import { INTERNAL_SERVER_ERROR } from './app/constants/httpStatusCodes';

const app: Express = express();

app.use(cors());
app.use(express.json());


app.get('/', (req: Request, res: Response) => {
  // throw new Error('This is a test error'); // Intentionally throwing an error to test the error handler
  appAssert(false, INTERNAL_SERVER_ERROR, 'This is a test assertion failure');
  res.send('Hello World!');
});

app.use(errorHandler);
export default app;