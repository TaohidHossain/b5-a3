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
const mongoose_1 = require("mongoose");
const AppError_1 = __importDefault(require("../../utils/AppError"));
const httpStatusCodes_1 = require("../../constants/httpStatusCodes");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
    },
    author: {
        type: String,
        required: [true, "Author is required"],
        trim: true,
    },
    genre: {
        type: String,
        enum: {
            values: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
            message: "{VALUE} is not a valid genre",
        },
        required: [true, "Genre is required"],
    },
    isbn: {
        type: String,
        required: [true, "ISBN is required"],
        unique: [true, "ISBN must be unique"],
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    copies: {
        type: Number,
        required: [true, "Number of copies is required"],
        min: [0, "Number of copies cannot be negative"],
    },
    available: {
        type: Boolean,
        default: true,
    },
}, {
    versionKey: false,
    timestamps: true,
});
// Document<unknown, {}, IBook, {}> & IBook & {_id: Types.ObjectId;} & { __v: number;}
bookSchema.statics.deductCopies = function (book, quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        if (book.copies - quantity < 0) {
            throw new AppError_1.default(httpStatusCodes_1.BAD_REQUEST, "Not enough copies available");
        }
        book.copies -= quantity;
        book.available = book.copies != 0;
        yield book.save();
    });
};
bookSchema.methods.isAvailable = function () {
    return this.available;
};
bookSchema.methods.markAsAvailable = function () {
    this.available = true;
};
bookSchema.methods.markAsUnavailable = function () {
    this.available = false;
};
bookSchema.pre("save", function (next) {
    console.log("Preparing to save book:", this.title);
    this.copies < 0 ? next(new AppError_1.default(httpStatusCodes_1.BAD_REQUEST, "Number of copies cannot be negative")) : next();
    next();
});
bookSchema.post("findOneAndDelete", function (doc) {
    // delete related data or perform cleanup if necessary
});
bookSchema.post("save", function (doc) {
    console.log(`Book with ISBN ${doc.isbn} has been saved successfully.`);
});
const Book = (0, mongoose_1.model)("Book", bookSchema);
exports.default = Book;
