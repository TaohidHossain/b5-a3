"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = __importDefault(require("./app/middlewares/errorHandler"));
const httpStatusCodes_1 = require("./app/constants/httpStatusCodes");
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the API',
        success: true,
    });
});
app.use("/api", routes_1.default);
// Global error handler
app.use(errorHandler_1.default);
// Handle 404 errors
app.use(/(.*)/, (req, res) => {
    res.status(httpStatusCodes_1.NOT_FOUND).json({
        message: "Not a valid api end point",
        success: false,
        error: {
            name: "NotFoundError",
            message: "The requested resource was not found"
        }
    });
});
exports.default = app;
