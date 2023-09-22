import { IsEmail, IsNumber, IsOptional, IsPositive, IsString } from "class-validator"

export class findUserDto{
    @IsString()
    @IsEmail()
    email:string

    @IsNumber()
    @IsPositive()
    @IsOptional()
    id?: number
}