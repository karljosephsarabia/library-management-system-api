import { NextFunction, Request, Response } from "express";
import { AddBookSchema } from "../dto/AddBook.dto";
import BookModel from "../service/book.service";
import mongoose from "mongoose";
import AppError from "../utils/appError";
import { BorrowReturnSchema } from "../dto/BorrowReturn.dto";


class BookController {

    //Retrieves all books.
    async showAllBooks(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await BookModel.showAllBook();
            if (!result.length) res.status(200).json({ message: "No books found" });
            return res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    }

    //Registers a new book.
    async registerBook(req: Request, res: Response, next: NextFunction) {
        try {
            const result = AddBookSchema.parse(req.body);
            await BookModel.insertOneBook(result);
            return res.status(200).json({ message: "Book Successfully Added!" });
        } catch (err) {
            next(err);
        }
    }

    //Borrows a book.
    async borrowBook(req: Request, res: Response, next: NextFunction) {
        try {
            const bookId = req.params.id;
            const isValidBookId = mongoose.Types.ObjectId.isValid(bookId);
            if (!isValidBookId) throw new AppError("Please provide a valid Book Id", "Invalid Book Id Format", 400);
            const emailValid = BorrowReturnSchema.parse(req.body);
            const updatedBook = await BookModel.borrowBook(bookId, emailValid);
            if (!updatedBook) return res.status(200).json({ message: "Book Not Available" });
            return res.status(200).json(updatedBook);
        } catch (err) {
            next(err);
        }


    }

    //Returns a borrowed book.
    async returnBook(req: Request, res: Response, next: NextFunction) {
        try {
            const bookId = req.params.id;
            const isValidBookId = mongoose.Types.ObjectId.isValid(bookId);
            if (!isValidBookId) throw new AppError("Please provide a valid Book Id", "Invalid Book Id Format", 400);
            const updatedBook = await BookModel.returnBook(bookId);
            if (!updatedBook) return res.status(200).json({ message: "Book Still Available" });
            return res.status(200).json(updatedBook);
        } catch (err) {
            next(err);
        }
    }

    //Retrieves available books.
    async availableBook(req: Request, res: Response, next: NextFunction) {
        try {
            const book = await BookModel.availableBook();
            if (!book) return res.status(200).json({ message: "No Book Available" });
            return res.status(200).json(book);
        } catch (err) {
            next(err);
        }
    }

}

export default new BookController;
