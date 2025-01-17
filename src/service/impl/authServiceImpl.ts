import dotenv from "dotenv"
import { AuthService } from "../authService"
import { LoginDTO } from "../../dtos/Login.dto"
import { db } from "../../config/db"
import { CustomError } from "../../utils/customError.error"
import { comparePassword } from "../../utils/password.util"
import jwt from "jsonwebtoken"

dotenv.config()

export class AuthServiceImpl implements AuthService {
    async login(data: LoginDTO): Promise<{ accessToken: string; refreshToken: string }> {
        
        const isUserExist = await db.user.findUnique({
            where: { email: data.email },
        })

        if(!isUserExist){
            throw new CustomError(401, "invalid password or email");
        }

        const isPasswordValid = await comparePassword(data.password, isUserExist.password);
        if(!isPasswordValid){
            throw new CustomError(401, "invalid password or email");
        }

        const fullname = isUserExist.firstName + ' ' + isUserExist.lastName;
        const accessToken = this.generateAccessToken(isUserExist.id, fullname, isUserExist.role);

        const refreshToken = this.generateRefreshToken(
            isUserExist.id,
            fullname,
            isUserExist.role
        );

        return { accessToken, refreshToken };
    }

    generateAccessToken( userId: number, name: string, role: string ): string {
        return jwt.sign({id: userId, name: role}, process.env.JWT_SECRET || '', 
            { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN }
        )
    };

    generateRefreshToken( userId: number, name: string, role: string ): string {
        return jwt.sign({id: userId, name: role}, process.env.JWT_SECRET || '', 
            { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
        )
    };

    generateOtpExpiration() {
        return new Date(Date.now() + 10 * 60 * 1000);
    }
    
}
