import { Router } from "express";
import { createBook, deleteBook, getAllBooks, getBookById, updateBook } from "./book.controller";

const router = Router();

router.route("/").post(createBook).get(getAllBooks);
router.route("/:bookId").get(getBookById).put(updateBook).delete(deleteBook);

export default router;