import { IsEmail, IsNotEmpty } from "class-validator";


export class VerifySmsDTO {
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    phoneNumber!: string;
}