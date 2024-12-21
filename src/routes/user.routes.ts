import express from "express";
import { UserController } from "../controllers/user.controller";


const userController = new UserController();
const userRouter = express.Router();

userRouter.post("/", userController.createUser);

userRouter.get("/:id", userController.getUserById)

userRouter.get("/", userController.getAllUsers)

userRouter.patch("/:id", userController.updateUser)

userRouter.delete("/:id", userController.deleteUser)


export default userRouter;