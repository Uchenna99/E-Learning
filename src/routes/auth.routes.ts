import { AuthController } from "../controllers/auth.controller";
import express from "express"
import passport from "passport";
import { Request, Response, NextFunction } from "express";

const authController = new AuthController();
const authRouter = express.Router();

authRouter.post("/", authController.login)



authRouter.get('login/success', authController.googleLoginSuccess)
authRouter.get('login/failed', authController.googleLoginFail)
authRouter.get('/logout', authController.logout)

authRouter.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}))


authRouter.get('/google/callback', passport.authenticate('google', {
    successRedirect: 'http://localhost:5173',
    failureRedirect: 'login/failed '
}))

export default authRouter;