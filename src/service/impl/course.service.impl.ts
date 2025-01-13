import { Course, User } from "@prisma/client";
import { db } from "../../config/db";
import { CreateUserDTO } from "../../dtos/CreateUser.dto";
import { UserService } from "../user-service";
import { CustomError } from "../../utils/customError.error";
import { hashPassword } from "../../utils/password.util";
import { CoursesService } from "../courses-service";
import { createCourseDTO } from "../../dtos/CreateCourse.dto";
import { title } from "process";


export class CoursesServiceImpl implements CoursesService {
    async createCourse(data: createCourseDTO): Promise<Course> {
        const CourseExists = await db.course.findFirst({
            where: {title}
        })
        if(CourseExists) {
            throw new CustomError(409, "Sorry, this course already exists.");
        }
        const course = await db.course.create({
            data: {
                title: data.title,
                description: data.description,
                price: data.price,
                duration: data.duration
            }
        })
        return course;
    }


    async getCourseById(id: number): Promise<Course | null> {
        const course = await db.course.findUnique({
            where: { id }
        });
        if(!course) {
            throw new CustomError(404, `Course with id: ${id} not found.`)
        }
        return course;
    }


    async getAllCourses(): Promise<Course[]> {
        return await db.course.findMany();
    }


    async updateCourse(id: number, data: Partial<createCourseDTO>): Promise<Course> {
        const course = await db.course.findFirst({
            where: { id }
        });
        if(!course) {
            throw new CustomError(404, `course with id: ${id} not found`)
        }

        const updatedCourse = await db.course.update({
            where: { id },
            data
        });
        return updatedCourse;
    }

    
    async deleteCourse(id: number): Promise<void> {
        await db.course.delete({
            where: { id }
        });
    }
}



