import { User } from "@prisma/client";
import { db } from "../../config/db";
import { CreateUserDTO } from "../../dtos/CreateUser.dto";
import { UserService } from "../user-service";
import { CustomError } from "../../utils/customError.error";
import { hashPassowrd } from "../../utils/password.util";


export class UserServiceImpl implements UserService {
    async createUser(data: CreateUserDTO): Promise<User> {
        const isUserExist = await db.user.findFirst({
            where: {
                email: data.email,
            }
        });

        if(isUserExist){
            throw new CustomError(409, "Oops, email already taken")
        }

        const user = await db.user.create({
            data: {
                email: data.email,
                password: await hashPassowrd(data.password),
                firstName: data.firstName,
                lastName: data.lastName,
                role: data.role
            },
        })
        return user;
    }
    getUserById(id: number): Promise<User> {
        throw new Error("Method not implemented.");
    }
    getAllsers(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    updateUser(id: number, data: Partial<CreateUserDTO>): Promise<User> {
        throw new Error("Method not implemented.");
    }
    deleteUser(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}