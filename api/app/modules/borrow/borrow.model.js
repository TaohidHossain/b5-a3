"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const borrowSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Book",
        required: [true, "Book ID is required"]
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is requireed"],
        min: [1, "Quantity must be a positive number"]
    },
    dueDate: {
        type: Date,
        required: [true, "Due date is required"],
        validate: {
            validator: function (value) {
                return value > new Date();
            },
            message: "Due date must be in the future"
        }
    }
}, {
    timestamps: true,
    versionKey: false
});
const Borrow = (0, mongoose_1.model)("Borrow", borrowSchema);
exports.default = Borrow;
