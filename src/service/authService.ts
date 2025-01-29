import { CreateUserDTO } from "dtos/CreateUser.dto";
import { LoginDTO } from "../dtos/Login.dto";
import { GetOtpDTO, VerifyEmailDTO } from "dtos/VerifyEmail.dto";
import { User } from "@prisma/client";
import { VerifySmsDTO } from "dtos/VerifySms.dto";


export interface AuthService {
    login(data: LoginDTO): Promise<{accessToken: string; refreshToken: string;}>
    verifyEmail(data: VerifyEmailDTO): Promise<User>;
    googleLogin(data: CreateUserDTO): Promise<{accessToken: string; refreshToken: string;}>;
    assignRole(role: string, email: string): Promise<void>;
    verifySms(data: VerifySmsDTO):Promise<any>;
    sendOtp(data: GetOtpDTO): Promise<void>;
    verifyOtp(data: VerifyEmailDTO): Promise<void>;
}