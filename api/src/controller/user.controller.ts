import { NextFunction, Request, Response } from "express";
import { UserRegisterSchema } from "../dto/UserRegister.dto";
import userModel from "../service/user.service";


class UserController {
    async userRegister(req: Request, res: Response, next: NextFunction) {
        try {
            const userValidation = UserRegisterSchema.parse(req.body);
            await userModel.userRegister(userValidation);
            return res.status(200).json({ message: "User successfully registered" });
        } catch (err) {
            next(err);
        }
    }
}

export default new UserController;