import { CreateUserDTO } from "dtos/CreateUser.dto";
import { LoginDTO } from "../dtos/Login.dto";
import { VerifyEmailDTO } from "dtos/VerifyEmail.dto";
import { User } from "@prisma/client";


export interface AuthService {
    login(data: LoginDTO): Promise<{accessToken: string; refreshToken: string;}>
    createUser(data: CreateUserDTO): Promise<User>;
    verifyEmail(data: VerifyEmailDTO): Promise<User>;
}