import { Types } from "mongoose";
import { Book } from "../model/book.model";
import { User } from "../model/user.model";
import AppError from "../utils/appError";
import { BookInput } from "../dto/AddBook.dto";
import { MongoServerError } from "mongodb";


class BookModel {

    //Retrieves all books from the database.
    async showAllBook() {
        try {
            const allBook = await Book.find();
            return allBook;
        } catch (err) {
            throw err;
        }
    }

    //Register a new book into the database.
    async insertOneBook(data: BookInput) {
        try {
            return await Book.create(data);
        } catch (err) {
            if (err instanceof MongoServerError && err.code === 11000) throw new AppError("Duplicate entry detected", "The isbn is already in use", 400);
            throw err;
        }
    }


    //Borrows a book by updating its status and associating it with a user.
    async borrowBook(bookId: string, email: object) {
        try {
            const book = await Book.findById(bookId);
            if (!book) throw new AppError("Book Not Found", "Not Found Error", 400);
            if (book.isBorrowed) return false;
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

    //Returns a borrowed book by updating its status and removing the association with the user.
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
            return false;

        } catch (err) {
            throw err;
        }
    }

    //Retrieves available books from the database.
    async availableBook() {
        try {
            const book = await Book.find({ isBorrowed: false });
            return book;
        } catch (err) {
            throw err;
        }
    }
}

export default new BookModel;
