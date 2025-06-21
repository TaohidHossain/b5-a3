import { Router } from 'express';
import bookRouter from '../modules/book/book.route';
import borrowRouter from '../modules/borrow/borrow.route';

const router = Router();

router.use('/books', bookRouter);
router.use('/borrow', borrowRouter);

export default router;
