import express from "express";
import { CoursesController } from "../controllers/courses.controller";


const courseController = new CoursesController();
const courseRouter = express.Router();

courseRouter.post("/", courseController.createCourse);

// courseRouter.get("/:id", userController.getUserById)

// courseRouter.get("/", userController.getAllUsers)

// courseRouter.patch("/:id", userController.updateUser)


export default courseRouter;