import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  @MaxLength(250, { message: 'Password must be less 250 symbols' })
  email: string

  @MinLength(10, { message: 'Password must be more 10 symbols' })
  @MaxLength(30, { message: 'Password must be less 30 symbols' })
  password: string

  @IsString()
  @MinLength(1, { message: 'Full name must be more 1 symbol' })
  @MaxLength(200, { message: 'Full name must be less 200 symbols' })
  fullName: string
}
