import UserController from "../controller/user.controller";
const express = require('express');
const userRouter = express.Router();


userRouter.post('/', UserController.userRegister);


export default userRouter;