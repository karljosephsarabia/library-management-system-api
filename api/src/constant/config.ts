//Loads environment variables from .env file and exports database credentials.
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
    account: process.env.db_USERNAME,
    password: process.env.db_PASSWORD,
    database: process.env.db_NAME,
    cluster: process.env.db_CLUSTER,
};

export default dbConfig;
