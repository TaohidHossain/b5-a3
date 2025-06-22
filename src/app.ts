import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import errorHandler from './app/middlewares/errorHandler';
import { NOT_FOUND } from './app/constants/httpStatusCodes';
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

// Global error handler
app.use(errorHandler);
// Handle 404 errors
app.use(/(.*)/, (req: Request, res: Response) => {
    res.status(NOT_FOUND).json({
      message: "Not a valid api end point",
      success: false,
      error: {
        name: "NotFoundError",
        message: "The requested resource was not found"
      }
    })
})

export default app;