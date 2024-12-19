import { Course, User } from "@prisma/client";
import { db } from "../../config/db";
import { CreateUserDTO } from "../../dtos/CreateUser.dto";
import { UserService } from "../user-service";
import { CustomError } from "../../utils/customError.error";
import { hashPassowrd } from "../../utils/password.util";
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


    deleteUser(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}