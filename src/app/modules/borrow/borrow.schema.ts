import * as z from "zod/v4";


export const createBorrowShema = z.object({
    book: z.string().min(24).max(24, "Book ID must be 24 characters long"),
    quantity: z.number().int().positive("Quantity must be a positive integer"),
    dueDate: z.coerce.date().refine(date => date > new Date(), {
        message: "Due date must be in the future"
    })
})