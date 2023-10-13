import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateFileDto } from './dto/create-file.dto'
import { UpdateFileDto } from './dto/update-file.dto'
import { ILike, Repository } from 'typeorm'
import { File, FileTypeEnum } from './entities/file.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { SortFileDto } from './dto/sort-file.dto'
import { SearchDto } from './dto/search-file.dto'

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>, // private readonly uploadService: UploadService,
  ) // private readonly configService: ConfigService,
  {}

  async create(createFileDto: CreateFileDto, id: number) {
    const newFile = {
      title: createFileDto.title,
      fileType: FileTypeEnum.IMAGE,
      fileUrl: '',
      user: {
        id,
      },
    }
    return this.fileRepository.save(newFile)
  }

  async findAll(
    sort: SortFileDto,
    id: number,
    page: number,
    limit: number,
    search?: SearchDto,
  ) {
    const query = search ? {title: ILike(`%${search}%`)} : undefined
    return this.fileRepository.find({
      where: {
        user: {
          id,
        },
        ...query      
      },
      order: { createAt: 'DESC' },
      take: limit,
      skip: (page - 1) * limit,
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

  // async findAllWithPagination(id: number, page: number, limit: number) {
  //   const files = await this.fileRepository.find({
  //     where: {
  //       user: { id },
  //     },
  //     relations: {
  //       user: true,
  //     },
  //     order: { createAt: 'DESC' },

  //   })
  //   return files
  // }

  async update(id: number, updateFileDto: UpdateFileDto) {
    const file = await this.fileRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
    })
    if (!file) throw new NotFoundException('File not found')
    return await this.fileRepository.update(id, updateFileDto)
  }

  async remove(id: number) {
    const file = await this.fileRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
    })
    return await this.fileRepository.delete(id)
  }
}
