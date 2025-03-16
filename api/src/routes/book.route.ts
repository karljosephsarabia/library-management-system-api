const express = require('express');
const bookRouter = express.Router();
import BookController from "../controller/book.controller";

// Route for retrieving all books
bookRouter.get('/:page?', BookController.showAllBooks);

// Route for adding a new book
bookRouter.post('/add', BookController.registerBook);

// Route for borrowing a book
bookRouter.patch('/:id/borrow', BookController.borrowBook);

// Route for returning a book
bookRouter.patch('/:id/return', BookController.returnBook);

// Route for retrieving available books
bookRouter.get('/available/:page?', BookController.availableBook);

export default bookRouter;
