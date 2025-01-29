import { AuthController } from "../controllers/auth.controller";
import express from "express"
import { authenticateUser } from "../middleware/auth.middleware";

const authController = new AuthController();
const authRouter = express.Router();

authRouter.post("/", authController.login)

authRouter.post("/google", authController.googleLogin)

authRouter.post("/verify", authController.verifyEmail)

authRouter.post("/verify-update", authController.verifyOtp)

authRouter.post("/verify-twilio", authController.verifysms)

authRouter.post("/verify-sendOtp", authenticateUser, authController.sendOtp)







export default authRouter;