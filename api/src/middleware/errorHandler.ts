import { NextFunction, Request, Response } from "express";
import * as z from "zod";
import AppError from "../utils/appError";


//Middleware function to handle errors.
const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    if (err instanceof z.ZodError) {
        return res.status(400).json({
            message: "Validation Error",
            field: err.errors.map(err => ({
                field: err.path.join('.'),
                message: err.message
            }))
        });
    }

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message,
            error: err.error
        });
    }

    return res.status(500).json('Internal Server Error');
};

export default errorHandler;
