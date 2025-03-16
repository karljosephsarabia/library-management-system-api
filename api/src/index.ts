import Database from "./config/db.config";
import bookRouter from "./routes/book.route";
import errorHandler from "./middleware/errorHandler";
import userRouter from "./routes/user.route";
import { Request, Response } from "express";



const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

// Routes

app.use('/api/book', bookRouter); 
app.use('/api/user-register', userRouter); 

app.use('/', (req: Request, res: Response) => {
    res.send('Server Connection is Ready...')
})

// Error handling middleware
app.use(errorHandler); 

// Start server and connect to database
app.listen(process.env.PORT || 3000, async () => {
    await Database.connect();
    console.log(`Server is running on port ${process.env.PORT || 3000} in ${process.env.NODE_ENV} environment`);
});


// Listen for app termination signals (e.g., Ctrl+C)
process.on("SIGINT", async () => {
    await Database.disconnect();
    process.exit(0);
});
