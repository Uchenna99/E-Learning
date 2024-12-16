import express from "express";
import { UserController } from "../controllers/user.controller";


const userController = new UserController();
const userRouter = express.Router();

userRouter.post("/", userController.createUser);



export default userRouter;