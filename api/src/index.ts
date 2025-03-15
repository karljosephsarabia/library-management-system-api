import Database from "./config/db.config";
import bookRouter from "./routes/book.route";
import errorHandler from "./middleware/errorHandler";
import userRouter from "./routes/user.route";

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/book', bookRouter);
app.use('/api/user-register', userRouter);
app.use(errorHandler);

app.listen(process.env.PORT || 3000, async () => {
    await Database.connect();
    console.log(`Server is running on port ${process.env.PORT || 3000} in ${process.env.NODE_ENV} environment`);
});


// Listen for app termination signals
process.on("SIGINT", async () => {
    await Database.disconnect();
    process.exit(0);
});