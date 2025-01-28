import { CreateUserDTO } from "dtos/CreateUser.dto";
import { AuthController } from "../controllers/auth.controller";
import express from "express"
import passport from "passport";
import { VerifyEmailDTO } from "dtos/VerifyEmail.dto";
import { LoginDTO } from "dtos/Login.dto";

const authController = new AuthController();
const authRouter = express.Router();

authRouter.post("/", authController.login)

authRouter.post("/google", authController.googleLogin)

authRouter.post("/verify", authController.verifyEmail)

authRouter.post("/verify-twilio", authController.verifysms)

authRouter.post("/verify-sendOtp", authController.sendOtp)




// authRouter.post("/", validationMiddleware(LoginDTO), authController.login);

// authRouter.post(
//   "/sign-up",
//   validationMiddleware(CreateUserDTO),
//   authController.createUser
// );

// authRouter.post(
//   "/verify-email",
//   validationMiddleware(VerifyEmailDTO),
//   authController.verifyEmail
// );






// authRouter.get('/login/success', (res: Response, req:Request)=>{const user = req.user; res.status(200).json({user: user})})
// authRouter.get('/login/failed', authController.googleLoginFail)
// authRouter.get('/logout', authController.logout)





export default authRouter;