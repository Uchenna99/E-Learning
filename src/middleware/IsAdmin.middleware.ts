import { StatusCodes } from "http-status-codes"
import { db } from "../config/db"
import { CustomError } from "../utils/customError.error"
import { Role } from "@prisma/client"
import { NextFunction, Response } from "express"
import { CustomRequest } from "./auth.middleware"



const IsAdmin = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
): Promise<void>=>{
    try {
        // req.userAuth obtain the ID of the logged in user
        const user = await db.user.findUnique({
            where: {
                id: Number(req.userAuth)
            }
        })
        if (!user){
            throw new CustomError(StatusCodes.NOT_FOUND, "User not found")
        }
        if(user.role === Role.ADMIN){
            next();
        }else{
            throw new CustomError(StatusCodes.NOT_FOUND, "Access denied")
        }
    } catch (error) {
        next(error);
    }
}

export default IsAdmin;