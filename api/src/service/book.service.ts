import { Types } from "mongoose";
import { Book } from "../schema/book.schema";
import { User } from "../schema/user.schema";
import AppError from "../utils/appError";
import { BookInput } from "../dto/AddBook.dto";
import { MongoServerError, ObjectId } from "mongodb";


class BookModel {

    async insertOneBook(data: BookInput) {
        try {
            return await Book.create(data);
        } catch (err) {
            if (err instanceof MongoServerError && err.code === 11000) throw new AppError("Duplicate entry detected", "The isbn is already in use", 400);
            throw err;
        }
    }

    async showAllBook() {
        try {
            const allBook = await Book.find();
            return allBook;
        } catch (err) {
            throw err;
        }
    }

    async borrowBook(bookId: string, email: object) {
        try {
            const book = await Book.findById(bookId);
            if (!book) throw new AppError("Book Not Found", "Not Found Error", 400);
            if (book.isBorrowed) throw new AppError("Book Not Available", "Not Available", 200);
            const user = await User.findOneAndUpdate(email, { $push: { borrowedBooks: book._id } }, { new: true });
            if (!user) throw new AppError("User Not Found", "Not Found Error", 400);

            book.isBorrowed = true;
            book.borrowedUserId = user._id as Types.ObjectId;
            await book.save();
            return book.populate("borrowedUserId");
        } catch (err) {
            throw err;
        }
    }

    async returnBook(bookId: string) {
        try {
            const book = await Book.findById(bookId);
            if (!book) throw new AppError("Book Not Found", "Not Found Error", 400);
            if (book.isBorrowed) {
                await User.findByIdAndUpdate(book.borrowedUserId, { $pull: { borrowedBooks: book._id } }, { new: true });
                book.isBorrowed = false;
                book.set("borrowedUserId", undefined);
                book.save();
                return book;
            }
            throw new AppError("Book still Available", "Available", 200);

        } catch (err) {
            throw err;
        }
    }
}

export default new BookModel;