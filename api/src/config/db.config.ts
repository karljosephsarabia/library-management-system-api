const mongoose = require("mongoose");
import dbConfig from "../constant/config";
import mongodbConnectionStatus from "../constant/dbStatus";

class Database {
    private uri: string;

    //Initializes the MongoDB connection URI.
    constructor() {
        this.uri = `mongodb+srv://${dbConfig.account}:${dbConfig.password}@${dbConfig.cluster}.vynig.mongodb.net/${dbConfig.database}?retryWrites=true&w=majority&appName=Cluster0`;
    }

    //Connects to the MongoDB database.
    async connect() {
        try {
            console.log('database connecting...');
            await mongoose.connect(this.uri);
            const dbState = mongoose.connection.readyState;
            console.log(`MongoDB connection status: ${mongodbConnectionStatus[dbState]}`);
        } catch (err) {
            console.log(err);
            throw new Error('Database Connection Error');
        }
    }

    //Disconnects from the MongoDB database
    async disconnect() {
        await mongoose.disconnect();
        const dbState = mongoose.connection.readyState;
        console.log(`MongoDB connection status: ${mongodbConnectionStatus[dbState]}`);
    }
}

export default new Database;
