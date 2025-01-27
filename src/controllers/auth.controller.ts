import { NextFunction, Request, Response } from "express";
import { LoginDTO } from "../dtos/Login.dto";
import { AuthServiceImpl } from "../service/impl/authServiceImpl";
import dotenv from "dotenv"
import { CreateUserDTO } from "dtos/CreateUser.dto";
import { VerifyEmailDTO } from "dtos/VerifyEmail.dto";
import { VerifySmsDTO } from "dtos/VerifySms.dto";

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

    public googleLogin =async (req: Request, res: Response, next: NextFunction)=>{
        try {
            // res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
            const data: CreateUserDTO = req.body;
            const {accessToken, refreshToken} = await this.authService.googleLogin(data);
            res.status(201).json({accessToken, refreshToken});
        } catch (error) {
            next(error);
        }
    }


    
    public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
    ): Promise<void> => {
    try {
        const data: CreateUserDTO = req.body;
        const user = await this.authService.createUser(data);
        res.status(201).json({
        error: false,
        message: `Otp has been sent successfully to your email @ ${user.email}`,
        user: user
        });
    } catch (error) {
        next(error);
    }
    };
    
    public verifyEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
    ): Promise<void> => {
    try {
        const data: VerifyEmailDTO = req.body;
        const user = await this.authService.verifyEmail(data);
        res.status(201).json({
        error: false,
        message: `Email verified. You have registered successfully`,
        user: user,
        });
    } catch (error) {
        next(error);
    }
    };


    public verifysms = async (req: Request, res: Response, next: NextFunction)=>{
        try {
            const data = req.body as VerifySmsDTO
            this.authService.verifySms(data)
            res.json({message: 'message sent'})
    
        } catch (error) {
            next(error);
        }
    }

















    public googleCallback = async (req: Request, res: Response, next: NextFunction)=>{
        try {
                // Send the token to the client
                const user = req.user as { token: string };
                res.status(200).json({ token: user.token });
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
            const user = req.user
            res.status(200).json({
                data: {user}
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