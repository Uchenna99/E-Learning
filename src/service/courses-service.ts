import { Course } from "@prisma/client";
import { createCourseDTO } from "../dtos/CreateCourse.dto";

export interface CoursesService {
    createCourse(data: createCourseDTO): Promise<Course>;
    getCourseById(id: number): Promise<Course | null>;
    getAllCourses(): Promise<Course[]>;
    updateCourse(id: number, data: Partial<createCourseDTO>): Promise<Course>;
    deleteCourse(id: number): Promise<void>;
}