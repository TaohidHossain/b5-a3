import { Router } from "express";
import { createBorrow, getBorrowedBooksSummery } from "./borrow.controller";

const borrowRouter = Router();

borrowRouter.post("/", createBorrow);
borrowRouter.get("/", getBorrowedBooksSummery);

export default borrowRouter;