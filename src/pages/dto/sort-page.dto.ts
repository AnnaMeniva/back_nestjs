import { Transform } from 'class-transformer'
import { IsEnum } from 'class-validator'


enum SortEnum {
  ASC = 'asc',
  DESC = 'desc',
}

export class SortPageDto {
  @IsEnum(SortEnum)
  title: SortEnum

  @IsEnum(SortEnum)
  createAt: SortEnum

  @IsEnum(SortEnum)
  status: SortEnum

  @IsEnum(SortEnum)
  fullName: SortEnum
}
