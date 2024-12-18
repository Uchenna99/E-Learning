import { NextFunction, Request, Response } from "express";
import { CoursesServiceImpl } from "../service/impl/course.service.impl";
import { createCourseDTO } from "../dtos/CreateCourse.dto";



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


}