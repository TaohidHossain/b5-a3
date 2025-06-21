import { model, Schema } from "mongoose";
import { IBorrow } from "./borrow.interface";


const borrowSchema = new Schema<IBorrow>(
    {
        book: {
            type: Schema.Types.ObjectId,
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
                validator: function (value: Date) {
                    return value > new Date();
                },
                message: "Due date must be in the future"
            }
        }
    },{
        timestamps: true,
        versionKey: false
    }
)

const Borrow = model<IBorrow>("Borrow", borrowSchema);
export default Borrow;

