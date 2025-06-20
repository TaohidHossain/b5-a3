import assert from "node:assert"
import { HttpStatusCodes } from "../constants/httpStatusCodes";
import AppError from "./AppError";

type AppAssert = (
    condition: any,
    statusCode: HttpStatusCodes,
    message: string
) => asserts condition

const appAssert: AppAssert = (condition, httpStatusCode, message) =>
    assert(condition, new AppError(httpStatusCode, message));

export default appAssert;
