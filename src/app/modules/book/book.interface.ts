import { Document, Model } from "mongoose";

export interface IBook {
    title: string,
    author: string,
    genre: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY",
    isbn: string,
    description?: string,
    copies: number,
    available: boolean
}

export interface BookModelType extends Model<IBook> {
    deductCopies(book: Document<unknown, {}, IBook, {}> & IBook, quantity: number): Promise<void>;
}

export interface BookMethods {
    isAvailable(): boolean;
    markAsAvailable(): void;
    markAsUnavailable(): void;
}