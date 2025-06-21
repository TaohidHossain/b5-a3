import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../../utils/catchAsyncError";
import { BAD_REQUEST, CREATED } from "../../constants/httpStatusCodes";
import { createBookSchema } from "./book.schema";
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