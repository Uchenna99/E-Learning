import express from "express";
import { UserController } from "../controllers/user.controller";
import { useContainer } from "class-validator";


const userController = new UserController();
const userRouter = express.Router();

userRouter.post("/", userController.createUser);

userRouter.get("/:id", userController.getUserById)

userRouter.get("/", userController.getAllUsers)

userRouter.put("/", )


export default userRouter;