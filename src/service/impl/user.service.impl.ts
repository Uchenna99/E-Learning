import { User } from "@prisma/client";
import { db } from "../../config/db";
import { CreateUserDTO } from "../../dtos/CreateUser.dto";
import { UserService } from "../user-service";
import { CustomError } from "../../utils/customError.error";
import { hashPassword } from "../../utils/password.util";
import { StatusCodes } from "http-status-codes";


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
                password: await hashPassword(data.password),
                firstName: data.firstName,
                lastName: data.lastName,
            },
        })
        return user;
    }


    async getUserById(id: number): Promise<User | null> {
        const user = await db.user.findUnique({
            where: { id },
        });
        if(!user) {
            throw new CustomError(404, `User with id: ${id} does not exist`);
        }
        return user;
    }


    async getAllsers(): Promise<User[]> {
        return await db.user.findMany();
    }


    async updateUser(id: number, data: Partial<CreateUserDTO>): Promise<User> {
        const isUserExists = await db.user.findFirst({
            where: { id, }
        });
        if (!isUserExists) {
            throw new CustomError(404, `There is no user with id: ${id}`);
        }
        const user = await db.user.update({
            where: { id },
            data,
        });
        return user;
    }


    async deleteUser(id: number): Promise<void> {
        await db.user.delete({
            where: { id }
        });
    }


    async profile(id: number): Promise<Omit<User, "password">> {
        const user = await db.user.findFirst({
            where: { id },
        })

        if(!user) {
            throw new CustomError(StatusCodes.NOT_FOUND, `User with id: ${id} not found`)
        }
        return user;
    }
    
}