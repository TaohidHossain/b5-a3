import * as z from "zod/v4";


export const createBookSchema = 
    z.object({
        title: z.string().min(1, "Title is required"),
        author: z.string().min(1, "Author is required"),
        genre: z.enum(["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "FANTASY"]),
        isbn: z.string().min(1, "ISBN is required"),
        description: z.string().optional(),
        copies: z.number().int().min(0, "Number of copies cannot be negative"),
        available: z.boolean().default(true),
    }).refine(data => {
    if(data.copies == 0 && data.available) {
        return false; 
    }
    return true;
    }, {
        message: "Contradictory data: if copies is 0, available must be false",
        path: ["copies", "available"],
    }).refine(data => {
    if(data.copies != 0 && !data.available) {
        return false; 
    }
    return true;
    }, {
        message: "Contradictory data: if copies is not 0, available must be true",
        path: ["copies", "available"],
    });

export const updateBookSchema =
    z.object({
        title: z.string().min(1, "Title cannot be empty").optional(),
        author: z.string().min(1, "Author cannot be empty").optional(),
        genre: z.enum(["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "FANTASY"]).optional(),
        description: z.string().optional(),
        copies: z.number().int().min(0, "Number of copies cannot be negative").optional(),
        available: z.boolean().optional(),
    })