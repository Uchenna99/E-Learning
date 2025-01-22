import dotenv from "dotenv"
import { AuthService } from "../authService"
import { LoginDTO } from "../../dtos/Login.dto"
import { db } from "../../config/db"
import { CustomError } from "../../utils/customError.error"
import { comparePassword, hashPassword } from "../../utils/password.util"
import jwt from "jsonwebtoken"
import { User } from "@prisma/client"
import { CreateUserDTO } from "dtos/CreateUser.dto"
import { VerifyEmailDTO } from "dtos/VerifyEmail.dto"
import { generateOtp } from "utils/otp.util"
import { StatusCodes } from "http-status-codes"

dotenv.config();

export class AuthServiceImpl implements AuthService {
    createUser(data: CreateUserDTO): Promise<User> {
        throw new Error("Method not implemented.")
    }
    verifyEmail(data: VerifyEmailDTO): Promise<User> {
        throw new Error("Method not implemented.")
    }

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
        return jwt.sign({id: userId, name: name, role: role}, process.env.JWT_SECRET || '', 
            { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN }
        )
    };

    generateRefreshToken( userId: number, name: string, role: string ): string {
        return jwt.sign({id: userId, name: name, role: role}, process.env.JWT_SECRET || '', 
            { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
        )
    };

    generateOtpExpiration() {
        return new Date(Date.now() + 10 * 60 * 1000);
    }


    async googleLogin(data: CreateUserDTO): Promise<{ accessToken: string; refreshToken: string }> {
        const findUser = await db.user.findUnique({
            where: { email: data.email }
        })
        if(findUser){
            const userLogin: LoginDTO = {email: findUser.email, password: findUser.password} 
            const { accessToken, refreshToken } = await this.login(userLogin);
            return {accessToken, refreshToken};
        }else{
            const newUser = await db.user.create({
                data: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: await hashPassword('12345678')
                }
            })
            if(newUser){
                const {accessToken, refreshToken} = await this.login({email:newUser.email, password:newUser.password})
            }else{
                throw new CustomError(401, 'Process failed')
            }
            // return {accessToken, refreshToken}
            
        }
        return {accessToken, refreshToken}
    }



    // async verifyEmail(data: VerifyEmailDTO): Promise<User> {
    //     const user = await db.user.findFirst({
    //       where: {
    //         email: data.email,
    //       },
    //     });
    
    //     if (!user) {
    //       throw new CustomError(StatusCodes.NOT_FOUND, "Email not found");
    //     }
    //     if (user.emailVerified) {
    //       throw new CustomError(StatusCodes.BAD_REQUEST, "Email already verified");
    //     }
    //     if (!user.otp || !user.otpExpiry) {
    //       throw new CustomError(
    //         StatusCodes.BAD_REQUEST,
    //         "OTP is not available for this user"
    //       );
    //     }
    
    //     const isOtPValid = await comparePassword(data.otp, user.otp);
    //     if (!isOtPValid) {
    //       throw new CustomError(StatusCodes.BAD_REQUEST, "Invalid OTP");
    //     }
    
    //     const isExpiredOtp = user.otpExpiry < new Date();
    
    //     if (isExpiredOtp) {
    //       throw new CustomError(StatusCodes.BAD_REQUEST, "OTP is expired");
    //     }
    
    //     const userReg = await db.user.update({
    //       where: {
    //         id: user.id,
    //       },
    //       data: {
    //         emailVerified: true,
    //         otp: null,
    //         otpExpiry: null,
    //       },
    //     });
    //     //
    
    //     await welcomeEmail({
    //       to: userReg.email,
    //       subject: "Welcome to Futurerify",
    //       name: userReg.firstName + " " + userReg.lastName,
    //     });
    
    //     return userReg;
    //   }
    
      
    //   async createUser(data: CreateUserDTO): Promise<User> {
    //     const otp = generateOtp();
    //     const isUserExist = await db.user.findFirst({
    //       where: {
    //         email: data.email,
    //       },
    //     });
    
    //     if (isUserExist) {
    //       throw new CustomError(409, "oops email already taken");
    //     }
    
    //     const hashedOtp = await hashPassword(otp);
    //     const maRetries = 3;
    //     for (let attempt = 1; attempt <= maRetries; attempt++) {
    //       try {
    //         return await db.$transaction(async (transaction) => {
    //           const user = await transaction.user.create({
    //             data: {
    //               email: data.email,
    //               password: await hashPassword(data.password),
    //               firstName: data.firstName,
    //               lastName: data.lastName,
    //               otp: hashedOtp,
    //               otpExpiry: this.generateOtpExpiration(),
    //             },
    //           });
    
    //           await sendOtpEmail({
    //             to: data.email,
    //             subject: "Verify your email",
    //             otp,
    //           });
    //           return user;
    //         });
    //       } catch (error) {
    //         console.warn(`Retry ${attempt} due to transaction failure`, error);
    //         if (attempt === maRetries) {
    //           throw new CustomError(
    //             StatusCodes.INTERNAL_SERVER_ERROR,
    //             "Failed to create user after multiple retry"
    //           );
    //         }
    //       }
    //     }
    //     throw new CustomError(
    //       StatusCodes.INTERNAL_SERVER_ERROR,
    //       "Unexpected error during user creation"
    //     );
    
    //    
    //   }

    
}
