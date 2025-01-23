import { Role } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, Length } from "class-validator";

export class CreateUserDTO {
@IsNotEmpty()
@Length(2, 50)
firstName!: string;

@IsNotEmpty()
@Length(2, 50)
lastName!: string;

@IsEmail()
email!: string;

@IsNotEmpty()
@Length(6, 20)
password!: string;

}


export class CreateGoogleUserDTO {
    @IsNotEmpty()
    @Length(2, 50)
    firstName!: string;
    
    @IsNotEmpty()
    @Length(2, 50)
    lastName!: string;
    
    @IsEmail()
    email!: string;

    }

