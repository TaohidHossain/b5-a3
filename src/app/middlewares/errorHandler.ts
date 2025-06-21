import e, { ErrorRequestHandler, Response } from "express";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/httpStatusCodes";
import AppError from "../utils/AppError";
import * as z from "zod/v4";
import { MongooseError } from "mongoose";


function handelAppError(res: Response ,err: AppError) {
    console.log("captuered app error", err);
    return res.status(err.statusCode).json({
        message: err.message,
        success: false,
        error: err
    })
}

function handleZodError(res: Response, err: z.ZodError) {
    const errors = err.issues.map(err => ({
        path: err.path,
        message: err.message
    }));
    return res.status(BAD_REQUEST).json({
        message: "Validation Failed",
        success: false,
        error: {
            name: err.name,
            errors,
        },
    })
}

function handleMongooseError(res: Response, err: MongooseError) {
    return res.status(BAD_REQUEST).json({
        message: "Validation Failed",
        success: false,
        error: {
            name: err.name,
            message: err.message,
        }
    })
}

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if(err instanceof AppError) {
        handelAppError(res, err);
    }
    else if(err instanceof z.ZodError) {
        handleZodError(res, err);
    }
    else if(err instanceof MongooseError) {
        handleMongooseError(res, err);
    }
    else {
        console.log("default error handler", err);
        res.status(INTERNAL_SERVER_ERROR).json({
            message: "Internal Server Error",
            success: false,
            error: err
        });
    }
    
    next();
}

export default errorHandler;