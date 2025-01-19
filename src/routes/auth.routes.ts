import { AuthController } from "../controllers/auth.controller";
import express from "express"
import passport from "passport";

const authController = new AuthController();
const authRouter = express.Router();

authRouter.post("/", authController.login)


authRouter.get('/google', passport.authenticate('google', {scope: ['profile']}))

authRouter.get('/google/callback', passport.authenticate('google', {
    successRedirect: 'http://localhost:5173'
}))

export default authRouter;