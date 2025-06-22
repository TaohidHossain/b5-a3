"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const catchAsyncError_1 = __importDefault(require("../../utils/catchAsyncError"));
const httpStatusCodes_1 = require("../../constants/httpStatusCodes");
const book_schema_1 = require("./book.schema");
const book_model_1 = __importDefault(require("./book.model"));
const appAssert_1 = __importDefault(require("../../utils/appAssert"));
exports.createBook = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedBody = book_schema_1.createBookSchema.parse(req.body);
    const newBook = yield book_model_1.default.create(parsedBody);
    (0, appAssert_1.default)(newBook, httpStatusCodes_1.BAD_REQUEST, "Book creation failed");
    return res.status(httpStatusCodes_1.CREATED).json({
        message: "Book created successfully",
        success: true,
        data: newBook
    });
}));
exports.getAllBooks = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter, sortBy = 'title', sort = 'asc', page = 1, limit = 10, } = req.query;
    const filterQuery = {};
    if (filter) {
        filterQuery.genre = filter;
    }
    const sortDirection = sort === 'asc' ? 1 : -1;
    const sortQuery = {
        [sortBy]: sortDirection,
    };
    const skip = (Number(page) - 1) * Number(limit);
    const books = yield book_model_1.default.find(filterQuery)
        .sort(sortQuery)
        .skip(skip)
        .limit(Number(limit));
    return res.status(httpStatusCodes_1.OK).json({
        message: "Books retrieved successfully",
        success: true,
        data: books
    });
}));
exports.getBookById = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const book = yield book_model_1.default.findById(bookId);
    (0, appAssert_1.default)(book, httpStatusCodes_1.NOT_FOUND, "Book not found");
    return res.status(httpStatusCodes_1.OK).json({
        message: "Book retrieved successfully",
        success: true,
        data: book
    });
}));
exports.updateBook = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const parsedBody = book_schema_1.updateBookSchema.parse(req.body);
    if (parsedBody.available == false) {
        parsedBody.copies = 0; // If available is false, set copies to 0
    }
    if (parsedBody.copies == 0) {
        parsedBody.available = false; // If copies is 0, set available to false
    }
    else {
        parsedBody.available = true; // If copies is not 0, set available to true
    }
    const updatedBook = yield book_model_1.default.findByIdAndUpdate(bookId, parsedBody, { new: true, runValidators: true });
    (0, appAssert_1.default)(updatedBook, httpStatusCodes_1.NOT_FOUND, "Book not found");
    return res.status(httpStatusCodes_1.OK).json({
        message: "Book updated successfully",
        success: true,
        data: updatedBook
    });
}));
exports.deleteBook = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const deletedBook = yield book_model_1.default.findByIdAndDelete(bookId);
    (0, appAssert_1.default)(deletedBook, httpStatusCodes_1.NOT_FOUND, "Book not found");
    return res.status(httpStatusCodes_1.OK).json({
        message: "Book deleted successfully",
        success: true,
        data: null
    });
}));
