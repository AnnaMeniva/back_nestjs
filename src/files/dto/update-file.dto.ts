import { PartialType } from '@nestjs/mapped-types';
import { CreateFileDto } from './create-file.dto';
import { FileTypeEnum } from '../entities/file.entity';

export class UpdateFileDto extends PartialType(CreateFileDto) {
    title: string

}
