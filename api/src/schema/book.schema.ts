import mongoose, { Document, Schema, Types } from "mongoose";


export interface BookInterface extends Document {
    title: string,
    author: string,
    category?: string,
    isbn: string,
    isBorrowed: boolean,
    borrowedUserId?: Types.ObjectId;
    createdAt: Date,
    updatedAt: Date;
}


export const BookSchema: Schema = new Schema<BookInterface>(
    {
        title: { type: String, required: true, trim: true },
        author: { type: String, required: true, trim: true },
        category: { type: String, trim: true },
        isbn: { type: String, trim: true, unique: true, required: true },
        isBorrowed: { type: Boolean, default: false },
        borrowedUserId: { type: Schema.Types.ObjectId, ref: "User" }
    },
    {
        timestamps: true
    }
);


export const Book = mongoose.model<BookInterface>("Book", BookSchema);