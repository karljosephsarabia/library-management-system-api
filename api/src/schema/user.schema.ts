import mongoose, { Document, Schema, Types } from "mongoose";


export interface UserInterface extends Document {
    fullName: string,
    email: string,
    phone: string,
    borrowedBooks: Types.ObjectId[];
}


const UserSchema: Schema = new Schema<UserInterface>(
    {
        fullName: { type: String, required: true, trim: true },
        email: { type: String, unique: true, required: true, lowercase: true },
        phone: { type: String, required: true, trim: true },
        borrowedBooks: [{ type: Schema.Types.ObjectId, ref: "Book", default: [] }],
    },
    { timestamps: true }
);

export const User = mongoose.model<UserInterface>("User", UserSchema);