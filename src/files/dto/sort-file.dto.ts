import { IsEnum } from "class-validator"


enum SortEnum {
    ASC = 'asc',
    DESC = 'desc',
  }
export class SortFileDto{
    
        @IsEnum(SortEnum)
        title: SortEnum
      
        
        @IsEnum(SortEnum)
        createAt: SortEnum
   
      
}