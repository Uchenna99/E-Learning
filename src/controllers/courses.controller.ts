import { NextFunction, Request, Response } from "express";
import { CoursesServiceImpl } from "../service/impl/course.service.impl";
import { createCourseDTO } from "../dtos/CreateCourse.dto";
import { Course } from "@prisma/client";
import { CustomError } from "../utils/customError.error";



export class CoursesController {
    private coursesService: CoursesServiceImpl;

    constructor() {
        this.coursesService = new CoursesServiceImpl();
    }

    public createCourse = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try{
            const courseData = req.body as createCourseDTO;
            const newCourse = await this.coursesService.createCourse(courseData);
            res.status(201).json(newCourse);
        }catch(error){
            next(error);
        }
    }


    public getCourseById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>=>{
        try {
            const courseId = parseInt(req.params.id);
            const course = await this.coursesService.getCourseById(courseId);
            if(!course) {
                res.status(404).json({message:"Course not found"})
            }
            res.status(200).json(course)
        } catch (error) {
            next(error)
        }
    }


    public getAllCourses = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>=>{
        try {
            const allCourses = await this.coursesService.getAllCourses();
            res.status(200).json({allCourses});
        } catch (error) {
            next(error)
        }
    }


    public updateCourses = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>=>{
        try {
            const courseId = parseInt(req.params.id);
            const updateData = req.body as Partial<createCourseDTO>;
            const updatedCourse = await this.coursesService.updateCourse(courseId, updateData);
            res.status(200).json(updatedCourse)
        } catch (error) {
            next(error);
        }
    };


    public deleteCourses = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>=>{
        try {
            const courseId = parseInt(req.params.id);
            await this.coursesService.deleteCourse(courseId)
            res.status(200).json({message: `Course with id: ${courseId} has been deleted`})
        } catch (error) {
            next(error);
        }
    };
}