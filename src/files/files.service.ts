import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateFileDto } from './dto/create-file.dto'
import { UpdateFileDto } from './dto/update-file.dto'
import { Repository } from 'typeorm'
import { File } from './entities/file.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { SortFileDto } from './dto/sort-file.dto'

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  async create(createFileDto: CreateFileDto, id: number) {
    const newFile = {
      titleFile: createFileDto.titleFile,
      user: {
        id,
      },
    }
    return await this.fileRepository.save(newFile)
  }

  async findAll(sort: SortFileDto) {
    return await this.fileRepository.find({
      where: {},
      order: { ...sort },
      relations: {
        user: true,
      },
    })
  }

  async findOne(id: number) {
    const file = await this.fileRepository.findOne({
      where: { id },
      relations: { user: true },
    })
    if (!file) throw new NotFoundException('File not found')

    return file
  }

  async update(id: number, updateFileDto: UpdateFileDto) {
    const file = await this.fileRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
    })
    if(!file) throw new NotFoundException('File not found')
    return await this.fileRepository.update(id, updateFileDto)
  }

  async remove(id: number) {
    const file = await this.fileRepository.findOne({
      where:{id},
      relations:{
        user: true
      }
    })
    return await this.fileRepository.delete(id)
  }
}
