import { NextFunction, Request, Response } from "express"
import catchAsyncError from "../../utils/catchAsyncError"
import { BAD_REQUEST, CREATED } from "../../constants/httpStatusCodes"
import { createBorrowShema } from "./borrow.schema"
import Borrow from "./borrow.model"
import appAssert from "../../utils/appAssert"
import Book from "../book/book.model"


export const createBorrow = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const parsedBody = createBorrowShema.parse(req.body)

    const book = await Book.findById(parsedBody.book);
    appAssert(book, BAD_REQUEST, "Book not found")
    appAssert(book.available, BAD_REQUEST, "No available copies of the book")

    await Book.deductCopies(book, parsedBody.quantity)
    const newBorrow = await Borrow.create(parsedBody)
    appAssert(newBorrow, BAD_REQUEST, "Borrow creation failed")

    return res.status(CREATED).json({
        message: "Book borrowed successfully",
        success: true,
        data: newBorrow
    })
})