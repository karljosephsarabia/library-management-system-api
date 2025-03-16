//Represents the different states of the MongoDB connection.
enum mongodbConnectionStatus {
    "Disconnected" = 0,
    "Connected" = 1,
    "Connecting" = 2,
    "Disconnecting" = 3
};

export default mongodbConnectionStatus;
