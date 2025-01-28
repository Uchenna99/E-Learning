import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";



export class VerifyEmailDTO {
    @IsString()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @IsString()
    @Length(6, 6)
    otp!: string;
}


export class GetOtpDTO{
  @IsString()
  @IsNotEmpty()
  otpType!: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email!: string;
}