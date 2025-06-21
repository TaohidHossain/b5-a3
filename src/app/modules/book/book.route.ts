import { Router } from "express";
import { createBook } from "./book.controller";

const router = Router();

router.route("/").post(createBook);

export default router;