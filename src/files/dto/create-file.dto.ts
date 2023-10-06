import { IsOptional, MaxLength, MinLength } from 'class-validator'
import { User } from 'src/user/entities/user.entity'
import { FileTypeEnum } from '../entities/file.entity'

export class CreateFileDto {
  @MinLength(3, { message: 'File name must be more 3 symbols' })
  @MaxLength(30, { message: 'File name must be less 30 symbols' })
  title: string

  // fileType: FileTypeEnum

  // @IsOptional()
  // user?: User
}
