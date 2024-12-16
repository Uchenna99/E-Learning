import { User } from "@prisma/client";
import { CreateUserDTO } from "../dtos/CreateUser.dto";

export interface UserService {
    createUser(data: CreateUserDTO): Promise<User>;
    getUserById(id: number): Promise<User>;
    getAllsers(): Promise<User[]>;
    updateUser(id: number, data: Partial<CreateUserDTO>): Promise<User>;
    deleteUser(id: number): Promise<void>;
}