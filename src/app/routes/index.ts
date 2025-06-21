import { Router } from 'express';
import bookRouter from '../modules/book/book.route';

const router = Router();

router.use('/books', bookRouter);

export default router;
