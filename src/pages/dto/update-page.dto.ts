import { PageStatusEnum } from '../entities/page.entity';
import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdatePageDto {
    @IsString()
    @MinLength(3)
    title: string;

    @IsEnum(PageStatusEnum)
    @IsOptional()
    status: PageStatusEnum
}
