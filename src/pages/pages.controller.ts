import {
  Controller,
  UseGuards,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  ValidationPipe,
  UsePipes,
  Query,
} from '@nestjs/common'
import { PagesService } from './pages.service'
import { CreatePageDto } from './dto/create-page.dto'
import { UpdatePageDto } from './dto/update-page.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { SortPageDto } from './dto/sort-page.dto'

@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  create(@Body() createPageDto: CreatePageDto, @Req() req) {
    return this.pagesService.create(createPageDto, +req.user.id)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query() sort: SortPageDto) {
    return this.pagesService.findAll(sort)
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.pagesService.findOne(+id)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updatePageDto: UpdatePageDto) {
    return this.pagesService.update(+id, updatePageDto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.pagesService.remove(+id)
  }
}
