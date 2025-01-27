import { User } from "@prisma/client";
import { db } from "../../config/db";
import { CreateUserDTO } from "../../dtos/CreateUser.dto";
import { UserService } from "../user-service";
import { CustomError } from "../../utils/customError.error";
import { comparePassword, hashPassword } from "../../utils/password.util";
import { StatusCodes } from "http-status-codes";
import { ChangePasswordDTO } from "dtos/ResetPassword.dto";


export class UserServiceImpl implements UserService {

    async setPassword(id: number, data: ChangePasswordDTO): Promise<void> {
        
        await db.$transaction(async (transaction)=>{
            const user = await transaction.user.findUnique({
                where: {id}
            });
            if (!user){
                throw new CustomError(StatusCodes.NOT_FOUND, 'User not found');
            }

            const isPasswordValid = await comparePassword(data.oldPassword, user.password || '');
            if (!isPasswordValid){
                throw new CustomError(400, 'Current password is incorrect');
            }

            const previousPasswords = await transaction.passwordHistory.findMany({
                where: {userId: id},
                select: {passwordHash: true}
            });

            for (const history of previousPasswords){
                const isPreviouslyUsed = await comparePassword(data.newPassword, history.passwordHash);

                if(isPreviouslyUsed){
                    throw new CustomError(400, 'The new password has been used before. Please choose a different password')
                }

                // Save the current password to password history
                if(user.password){
                    await transaction.passwordHistory.create({
                        data: {
                            userId: user.id,
                            passwordHash: user.password
                        }
                    })
                }

                // Hash the new password
                const hashedPassword = await hashPassword(data.newPassword);

                // Update the user's password
                await transaction.user.update({
                    where: {id},
                    data: {password: hashedPassword}
                });

                const passwordHistoryCount = await transaction.passwordHistory.count({
                    where: {userId: id},
                });

                if (passwordHistoryCount > 5){
                    const oldestPassword = await transaction.passwordHistory.findFirst({
                        where: {userId: id},
                        orderBy: {createdAt: 'asc'}
                    });

                    if(oldestPassword){
                        await transaction.passwordHistory.delete({
                            where: {id: oldestPassword.id}
                        })
                    }
                }
            }
        })
    }

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