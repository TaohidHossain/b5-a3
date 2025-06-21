import { Router } from "express";
import { createBorrow } from "./borrow.controller";

const borrowRouter = Router();

borrowRouter.post("/", createBorrow);

export default borrowRouter;