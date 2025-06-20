import { ErrorRequestHandler, Response } from "express";
import { INTERNAL_SERVER_ERROR } from "../constants/httpStatusCodes";
import AppError from "../utils/AppError";


function handelAppError(res: Response ,err: AppError) {
    console.log("captuered app error", err);
    return res.status(err.statusCode).json({
        message: err.message,
        success: false,
        error: err
    })
}


const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if(err instanceof AppError) {
        handelAppError(res, err);
    }
    else {
        res.status(INTERNAL_SERVER_ERROR).json({
            message: "Internal Server Error",
            success: false,
            error: err
        });
    }
    
    next();
}

export default errorHandler;