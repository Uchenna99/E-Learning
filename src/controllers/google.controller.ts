import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();

export class googleController {

    public createGoogleToken = async (
        req: Request,
        res: Response,
        next: NextFunction
    )=>{
        try {
            const user = req.user as User;
            
            // Create a JWT token
            const token = await jwt.sign( {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                emailVerified: user.emailVerified,
                role: user.role
            } , process.env.JWT_SECRET as string, {
                expiresIn: '1h',
            });
    
            // Respond with the token
            // res.status(200).json({token});
            res.redirect('http://localhost:5173/dash');
            
        } catch (error) {
            next(error);
        }
    }
}