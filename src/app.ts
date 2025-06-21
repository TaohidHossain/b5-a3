import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import errorHandler from './app/middlewares/errorHandler';
import appAssert from './app/utils/appAssert';
import { INTERNAL_SERVER_ERROR } from './app/constants/httpStatusCodes';
import router from './app/routes';

const app: Express = express();

app.use(cors());
app.use(express.json());


app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to the API',
    success: true,
  });
});

app.use("/api", router)

app.use(errorHandler);
export default app;