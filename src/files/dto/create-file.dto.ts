import { MaxLength, MinLength } from 'class-validator'

export class CreateFileDto {
  @MinLength(3, { message: 'File name must be more 3 symbols' })
  @MaxLength(30, { message: 'File name must be less 30 symbols' })
  title: string
}
