import express from "express";
import { EnrollmentController } from "../controllers/enrollment.controller";
// import { validationMiddleware } from "../middlewares/validationMiddleware.middleware";
import { InitiateEnrollmentDTO } from "../dtos/initiateEnrollment.dto";

const enrollmentRouter = express.Router();
const enrollmentController = new EnrollmentController();
enrollmentRouter.post("/initiate", enrollmentController.initiateEnrollment);
enrollmentRouter.get("/verify", enrollmentController.verifyEnrollmentPayment);

export default enrollmentRouter;