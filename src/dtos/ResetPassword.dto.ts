import { IsNotEmpty, IsString } from "class-validator";


export class ResetPasswordDTO{
    @IsNotEmpty()
    @IsString()
    newPassword!: string;
}


export class ChangePasswordDTO{
    @IsNotEmpty()
    @IsString()
    oldPassword!: string;

    @IsNotEmpty()
    @IsString()
    newPassword!: string;
}