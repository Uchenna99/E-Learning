import { NextFunction, Request, Response } from "express";
import { UserServiceImpl } from "../service/impl/user.service.impl";
import { CreateUserDTO } from "../dtos/CreateUser.dto";
import { StatusCodes } from "http-status-codes";
import { CustomRequest } from "../middleware/auth.middleware";
import { ChangePasswordDTO } from "dtos/ResetPassword.dto";


export class UserController {
    private userService: UserServiceImpl;

    constructor() {
        this.userService = new UserServiceImpl();
    }

    public createUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try{
            const userData = req.body as CreateUserDTO;
            const newUser = await this.userService.createUser(userData);
            res.status(201).json(newUser);
        }catch(error){
            next(error);
        }
    }


    public getUserById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void | any> => {
        try {
            const userId = parseInt(req.params.id);
            const user = await this.userService.getUserById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(user)
        } catch (error) {
            next(error);
        }
    }


    public getAllUsers = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const users = await this.userService.getAllsers();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }


    public updateUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const userId = parseInt(req.params.id);
            const userData = req.body as Partial<CreateUserDTO>;
            const updatedUser = await this.userService.updateUser(userId, userData);
            res.status(200).json(updatedUser);
        } catch (error) {
            next(error);
        }
    }


    public deleteUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>=>{
        try {
            const userId = parseInt(req.params.id);
            await this.userService.deleteUser(userId);
            res.status(200).json({message: `User with id: ${userId} has been deleted`})
        } catch (error) {
            next(error);
        }
    };

    public profile = async (
        req: CustomRequest,
        res: Response,
        next: NextFunction
    ): Promise<void | any> =>{
        try {
            const id = req.userAuth;
            const user = await this.userService.getUserById(Number(id));

            res.status(StatusCodes.OK).json({
                error: false,
                message: 'User profile retrieved successfully',
                data: user
            });

        } catch (error) {
            next(error);
        }
    }


    public setPassword = async (
        req: CustomRequest,
        res: Response,
        next: NextFunction
    ): Promise<void>=>{
        try {
            const id = req.userAuth;
            const data = req.body as ChangePasswordDTO;
            await this.userService.setPassword(Number(id), data);
            res.status(StatusCodes.OK).json({
                error: false,
                message: 'Password changed successfully'
            });
        } catch (error) {
            next(error);
        }
    };

    public getAllStates = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>=>{
        try {
            const allStates = await this.userService.getStates();
            res.status(200).json(allStates);
            
        } catch (error) {
            next(error);
        }
    };
}