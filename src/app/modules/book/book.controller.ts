import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../../utils/catchAsyncError";
import { BAD_REQUEST, CREATED, NO_CONTENT, NOT_FOUND, OK } from "../../constants/httpStatusCodes";
import { createBookSchema, updateBookSchema } from "./book.schema";
import Book from "./book.model";
import appAssert from "../../utils/appAssert";


export const createBook = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const parsedBody = createBookSchema.parse(req.body);

    const newBook = await Book.create(parsedBody);
    appAssert(newBook, BAD_REQUEST, "Book creation failed");

    return res.status(CREATED).json({
        message: "Book created successfully",
        success: true,
        data: newBook
    })
})

export const getAllBooks = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const {
      filter,
      sortBy = 'title',
      sort = 'asc',
      page = 1,
      limit = 10,
    } = req.query;
    const filterQuery: Record<string, string> = {};
    if (filter) {
        filterQuery.genre = filter as string;
    }

    const sortDirection = sort === 'asc' ? 1 : -1;
    const sortQuery: Record<string, 1 | -1> = {
      [sortBy as string]: sortDirection,
    };

    const skip = (Number(page) - 1) * Number(limit);

    const books = await Book.find(filterQuery)
      .sort(sortQuery)
      .skip(skip)
      .limit(Number(limit));

    return res.status(OK).json({
        message: "Books retrieved successfully",
        success: true,
        data: books
    })
})

export const getBookById = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);
    appAssert(book, NOT_FOUND, "Book not found");

    return res.status(OK).json({
        message: "Book retrieved successfully",
        success: true,
        data: book
    })
})

export const updateBook = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;
    const parsedBody = updateBookSchema.parse(req.body);
    
    if(parsedBody.available == false) {
        parsedBody.copies = 0; // If available is false, set copies to 0
    }

    if(parsedBody.copies == 0){
        parsedBody.available = false; // If copies is 0, set available to false
    }
    else {
        parsedBody.available = true; // If copies is not 0, set available to true
    }

    const updatedBook = await Book.findByIdAndUpdate(
        bookId,
        parsedBody,
        { new: true, runValidators: true })
    appAssert(updatedBook, NOT_FOUND, "Book not found");

    return res.status(OK).json({
        message: "Book updated successfully",
        success: true,
        data: updatedBook
    })
});

export const deleteBook = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;
    const deletedBook = await Book.findByIdAndDelete(bookId);
    appAssert(deletedBook, NOT_FOUND, "Book not found");

    return res.status(OK).json({
        message: "Book deleted successfully",
        success: true,
        data: null
    })
});