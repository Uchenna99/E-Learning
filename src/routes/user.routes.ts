import express from "express";
import { UserController } from "../controllers/user.controller";
import { authenticateUser } from "../middleware/auth.middleware";
import IsAdmin from "../middleware/IsAdmin.middleware";


const userController = new UserController();
const userRouter = express.Router();

userRouter.post("/", userController.createUser);

userRouter.get("/:id", authenticateUser, userController.getUserById)

userRouter.get("/", authenticateUser, IsAdmin, userController.getAllUsers)

userRouter.patch("/:id", authenticateUser, userController.updateUser)

userRouter.delete("/:id", authenticateUser, userController.deleteUser)

userRouter.get('/auth/profile', authenticateUser, userController.profile)




export default userRouter;