import { MongoServerError } from "mongodb";
import { UserRegisterInput } from "../dto/UserRegister.dto";
import { User } from "../schema/user.schema";
import AppError from "../utils/appError";


class UserModel {
    
    //Registers a new user.
    async userRegister(data: UserRegisterInput) {
        try {
            const user = await User.findOne({ email: data.email });
            if (user) throw new AppError("Duplicate entry detected", "The email is already in use", 400);
            const newUser = User.create(data);
            return newUser;
        } catch (err) {
            throw err;
        }
    }
}

export default new UserModel;
