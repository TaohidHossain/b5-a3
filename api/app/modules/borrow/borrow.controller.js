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
exports.getBorrowedBooksSummery = exports.createBorrow = void 0;
const catchAsyncError_1 = __importDefault(require("../../utils/catchAsyncError"));
const httpStatusCodes_1 = require("../../constants/httpStatusCodes");
const borrow_schema_1 = require("./borrow.schema");
const borrow_model_1 = __importDefault(require("./borrow.model"));
const appAssert_1 = __importDefault(require("../../utils/appAssert"));
const book_model_1 = __importDefault(require("../book/book.model"));
exports.createBorrow = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedBody = borrow_schema_1.createBorrowShema.parse(req.body);
    const book = yield book_model_1.default.findById(parsedBody.book);
    (0, appAssert_1.default)(book, httpStatusCodes_1.BAD_REQUEST, "Book not found");
    (0, appAssert_1.default)(book.available, httpStatusCodes_1.BAD_REQUEST, "No available copies of the book");
    yield book_model_1.default.deductCopies(book, parsedBody.quantity);
    const newBorrow = yield borrow_model_1.default.create(parsedBody);
    (0, appAssert_1.default)(newBorrow, httpStatusCodes_1.BAD_REQUEST, "Borrow creation failed");
    return res.status(httpStatusCodes_1.CREATED).json({
        message: "Book borrowed successfully",
        success: true,
        data: newBorrow
    });
}));
exports.getBorrowedBooksSummery = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const summery = yield borrow_model_1.default.aggregate([
        {
            $group: {
                _id: '$book',
                totalQuantity: { $sum: '$quantity' }
            }
        }, {
            $lookup: {
                from: 'books',
                localField: '_id',
                foreignField: '_id',
                as: 'book'
            }
        }, { $unwind: '$book' },
        {
            $project: {
                book: {
                    title: '$book.title',
                    isbn: '$book.isbn',
                },
                totalQuantity: 1,
                _id: 0
            }
        }
    ]);
    return res.status(httpStatusCodes_1.CREATED).json({
        message: "Borrowed books summary retrieved successfully",
        success: true,
        data: summery
    });
}));
