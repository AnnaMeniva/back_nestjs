import { IsNotEmpty, IsOptional, MinLength } from 'class-validator'
import { User } from 'src/user/entities/user.entity'

export class CreatePageDto {
  @MinLength(3, { message: 'Must be more 3 symbols' })
  title: string
  
  @IsOptional()
  user: User
}
