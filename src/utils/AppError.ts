import { HttpStatusCodes } from "../constants/httpStatusCodes";

class AppError extends Error {
    constructor(
        public statusCode: HttpStatusCodes,
        public message: string
    ) {
        super(message);
    }

    captureStackTrace() {
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;