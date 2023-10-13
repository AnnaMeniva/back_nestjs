import { Transform } from "class-transformer";
import { IsOptional } from "class-validator";
import { ILike } from "typeorm";

export class SearchDto {
  // @Transform(({value}) => {
  //   console.log
  //   return value ? ILike(`%${value}%`) : undefined
  // })
  @IsOptional()
  title: string
}
