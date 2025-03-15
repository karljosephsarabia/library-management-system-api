const express = require('express');
const bookRouter = express.Router();
import BookController from "../controller/book.controller";

bookRouter.get('/', BookController.showAllBooks);
bookRouter.post('/add', BookController.registerBook);
bookRouter.patch('/:id/borrow', BookController.borrowBook);
bookRouter.patch('/:id/return', BookController.returnBook);


export default bookRouter;