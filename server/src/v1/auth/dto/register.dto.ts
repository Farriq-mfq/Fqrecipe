import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator'
export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(55)
    name: string
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string
    @IsString()
    @IsNotEmpty()
    password: string
}