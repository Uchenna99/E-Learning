import express from "express";
import { CoursesController } from "../controllers/courses.controller";


const courseController = new CoursesController();
const courseRouter = express.Router();

courseRouter.post("/", courseController.createCourse);

courseRouter.get("/:id", courseController.getCourseById)

courseRouter.get("/", courseController.getAllCourses)

courseRouter.patch("/:id", courseController.updateCourses)

courseRouter.delete("/:id", courseController.deleteCourses)


export default courseRouter;