import { model, Schema } from "mongoose";
import { BookMethods, BookModelType, IBook } from "./book.interface";
import AppError from "../../utils/AppError";
import { BAD_REQUEST } from "../../constants/httpStatusCodes";


const bookSchema = new Schema<IBook, BookModelType, BookMethods>(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        author: {
            type: String,
            required: [true, "Author is required"],
            trim: true,
        },
        genre: {
            type: String,
            enum: {
                values: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
                message: "{VALUE} is not a valid genre",
            },
            required: [true, "Genre is required"],
        },
        isbn: {
            type: String,
            required: [true, "ISBN is required"],
            unique: [true, "ISBN must be unique"],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        copies: {
            type: Number,
            required: [true, "Number of copies is required"],
            min: [0, "Number of copies cannot be negative"],
        },
        available: {
            type: Boolean,
            default: true,
        },
    },{
        versionKey: false,
        timestamps: true,
    }
);

bookSchema.methods.isAvailable = function (): boolean {
    return this.available;
};

bookSchema.methods.markAsAvailable = function (): void {
    this.available = true;
};

bookSchema.methods.markAsUnavailable = function (): void {
    this.available = false;
};

bookSchema.pre("save", function (next) {
    console.log("Preparing to save book:", this.title);
    this.copies < 0 ? next(new AppError(BAD_REQUEST, "Number of copies cannot be negative")) : next();
    next();
});


bookSchema.post("findOneAndDelete", function (doc, next) {
    // delete related data or perform cleanup if necessary
});

bookSchema.post("save", function (doc) {
    console.log(`Book with ISBN ${doc.isbn} has been saved successfully.`);
});

const Book = model<IBook, BookModelType>("Book", bookSchema);
export default Book;