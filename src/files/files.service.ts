import { Injectable } from '@nestjs/common'
import { CreateFileDto } from './dto/create-file.dto'
import { UpdateFileDto } from './dto/update-file.dto'
import { Repository } from 'typeorm'
import { File } from './entities/file.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  async create(createFileDto: CreateFileDto, id: number) {
    const newFile ={
      titleFile: createFileDto.titleFile,
      user:{
        id
      }
    }
    return await this.fileRepository.save(newFile)
  }

  findAll() {
    return `This action returns all files`
  }

  findOne(id: number) {
    return `This action returns a #${id} file`
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`
  }

  remove(id: number) {
    return `This action removes a #${id} file`
  }
}