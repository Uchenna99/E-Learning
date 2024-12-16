import { Role } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, Length } from "class-validator";

export class CreateUserDTO {
@IsNotEmpty()
@Length(2, 50)
firstName!: String;

@IsNotEmpty()
@Length(2, 50)
lastName!: String;

@IsEmail()
email!: String;

@IsNotEmpty()
@Length(6, 20)
password!: String;

@IsOptional()
@IsNotEmpty()
@IsEnum(Role)
role?: Role;
}

