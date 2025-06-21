import { NextFunction, Request, Response } from "express";

type asyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;

function catchAsyncError(asyncController: asyncHandler): asyncHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await asyncController(req, res, next);
        } catch (error) {
            next(error);
        }
    }
}

export default catchAsyncError;