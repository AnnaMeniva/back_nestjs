import { Injectable, NotFoundException } from '@nestjs/common'
import { CreatePageDto } from './dto/create-page.dto'
import { UpdatePageDto } from './dto/update-page.dto'
import { Repository } from 'typeorm'
import { Page } from './entities/page.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { SortPageDto } from './dto/sort-page.dto'

@Injectable()
export class PagesService {
  constructor(
    @InjectRepository(Page)
    private readonly pageRepository: Repository<Page>,
  ) {}

  async create(createPageDto: CreatePageDto, id: number) {
    const newPage = {
      title: createPageDto.title,
      user: { id },
    }
    const res = await this.pageRepository
      .save(newPage)
      .catch((err) => console.log(err))
    return res
  }

  async findAll(sort: SortPageDto) {
    if (sort.fullName) {
      sort['user'] = {
        fullName: sort.fullName,
      }
      delete sort['fullName']
    }

    return await this.pageRepository.find({
      where: {},
      order: {
       ...sort,
      },
      relations: {
        user: true,
      },
    })
  }

  async findOne(id: number) {
    const page = await this.pageRepository.findOne({
      where: { id },
      relations: { user: true },
    })
    if (!page) throw new NotFoundException('Page not found')

    return page
  }

  async update(id: number, updatePageDto: UpdatePageDto) {
    const page = await this.pageRepository.findOne({
      where: { id },
      relations: { user: true },
    })
    if (!page) throw new NotFoundException('Page not found')
    return await this.pageRepository.update(id, updatePageDto)
  }

  async remove(id: number) {
    const page = await this.pageRepository.findOne({
      where: { id },
      relations: { user: true },
    })
    return await this.pageRepository.delete(id)
  }
}
