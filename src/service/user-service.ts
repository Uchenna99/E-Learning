import { State, User } from "@prisma/client";
import { CreateUserDTO } from "../dtos/CreateUser.dto";
import { ChangePasswordDTO } from "dtos/ResetPassword.dto";

export interface UserService {
    createUser(data: CreateUserDTO): Promise<User>;
    getUserById(id: number): Promise<User | null>;
    getAllsers(): Promise<User[]>;
    updateUser(id: number, data: Partial<CreateUserDTO>): Promise<User>;
    deleteUser(id: number): Promise<void>;
    profile(id: number): Promise<Omit<User, 'password'>>;
    setPassword(id: number, data: ChangePasswordDTO): Promise<void>;
}