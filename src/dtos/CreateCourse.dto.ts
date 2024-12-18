import { IsNotEmpty, IsOptional, Length } from "class-validator";

export class createCourseDTO {
    @IsNotEmpty()
    @Length(3, 50)
    title!: string;

    @IsNotEmpty()
    @IsOptional()
    @Length(3, 300)
    description!: string;

    @IsNotEmpty()
    price!: number;

    @IsNotEmpty()
    duration!: number;

    // @IsNotEmpty()
    // enrollments!: []
}
