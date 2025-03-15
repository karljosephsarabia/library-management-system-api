

class AppError extends Error {
    constructor(
        public message: string,
        public error: string,
        public statusCode: number) {
        super(message);
    }
}

export default AppError;