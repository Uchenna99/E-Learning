import { NextFunction, Request, Response } from "express";
import { LoginDTO } from "../dtos/Login.dto";
import { AuthServiceImpl } from "../service/impl/authServiceImpl";
import dotenv from "dotenv"

export class AuthController {
    private authService: AuthServiceImpl;

    constructor() {
        this.authService = new AuthServiceImpl();
    }

    public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data: LoginDTO = req.body;
            const { accessToken, refreshToken } = await this.authService.login(data)
            res.status(201).json({ accessToken, refreshToken });
        } catch (error) {
            next(error);
        }
    }

    public googleLoginFail = async (req: Request, res: Response, next: NextFunction)=>{
        try {
            res.status(401).json({
                success: false,
                message: "Failed"
            })
        } catch (error) {
            next(error)
        }
    }

    public googleLoginSuccess = async (req: Request, res: Response, next: NextFunction)=>{
        try {
            res.status(200).json({
                success: true,
                message: "Successful",
                user: req.user
            })
        } catch (error) {
            next(error)
        }
    }

    public logout = async (req: Request, res: Response, next: NextFunction)=>{
        try {
            await req.logOut(next);
            res.redirect('http://localhost:5173')
        } catch (error) {
            
        }
    }
}