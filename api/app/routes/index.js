"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_route_1 = __importDefault(require("../modules/book/book.route"));
const borrow_route_1 = __importDefault(require("../modules/borrow/borrow.route"));
const router = (0, express_1.Router)();
router.use('/books', book_route_1.default);
router.use('/borrow', borrow_route_1.default);
exports.default = router;
