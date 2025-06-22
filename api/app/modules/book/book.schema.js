"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookSchema = exports.createBookSchema = void 0;
const z = __importStar(require("zod/v4"));
exports.createBookSchema = z.object({
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
    genre: z.enum(["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "FANTASY"]),
    isbn: z.string().min(1, "ISBN is required"),
    description: z.string().optional(),
    copies: z.number().int().min(0, "Number of copies cannot be negative"),
    available: z.boolean().default(true),
}).refine(data => {
    if (data.copies == 0 && data.available) {
        return false;
    }
    return true;
}, {
    message: "Contradictory data: if copies is 0, available must be false",
    path: ["copies", "available"],
}).refine(data => {
    if (data.copies != 0 && !data.available) {
        return false;
    }
    return true;
}, {
    message: "Contradictory data: if copies is not 0, available must be true",
    path: ["copies", "available"],
});
exports.updateBookSchema = z.object({
    title: z.string().min(1, "Title cannot be empty").optional(),
    author: z.string().min(1, "Author cannot be empty").optional(),
    genre: z.enum(["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "FANTASY"]).optional(),
    description: z.string().optional(),
    copies: z.number().int().min(0, "Number of copies cannot be negative").optional(),
    available: z.boolean().optional(),
});
