"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_controller_1 = require("./book.controller");
const router = (0, express_1.Router)();
router.route("/").post(book_controller_1.createBook).get(book_controller_1.getAllBooks);
router.route("/:bookId").get(book_controller_1.getBookById).put(book_controller_1.updateBook).delete(book_controller_1.deleteBook);
exports.default = router;
