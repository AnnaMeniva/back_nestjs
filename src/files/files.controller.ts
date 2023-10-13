import {
  Controller,
  Query,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
} from '@nestjs/common'
import { FilesService } from './files.service'
import { CreateFileDto } from './dto/create-file.dto'
import { UpdateFileDto } from './dto/update-file.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { Express, query } from 'express'
import { FileInterceptor } from '@nestjs/platform-express'
import { UploadService } from 'src/aws/upload.service'
import { CurrentUser } from 'src/common/CurrentUserDecorator'
import { SortFileDto } from './dto/sort-file.dto'
import { SearchDto } from './dto/search-file.dto'

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly uploadService: UploadService,
  ) {}

  // @Get('pagination')
  // @UseGuards(JwtAuthGuard)
  // findAllWithPagination(
  //   @Req() req,
  //   @Query('page') page: number = 1,
  //   @Query('limit') limit: number = 5,
  // ) {
  //   return this.filesService.findAllWithPagination(+req.user.id, +page, limit)
  // }

  @Post(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  create(@Body() createFileDto: CreateFileDto, @Req() req) {
    return this.filesService.create(createFileDto, +req.user.id)
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Param('id') id: string,
    @CurrentUser() user,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // new FileTypeValidator({fileType: "image"})
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    await this.uploadService.upload(
      file.buffer,
      file.originalname,
      user.id,
      file.mimetype,
    )
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Query() sort: SortFileDto,
    @Query('title') search: SearchDto ,
    @CurrentUser() user,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    let files
    files = await this.filesService.findAll(sort, user.id, +page, limit, search)

    files = await Promise.all(
      files?.map(async (file) => {
        const url = await this.uploadService.getObjectSignedUrl(
          `${user.id}/${file.id}`,
        )
        return {
          signedUrl: url,
          createdDate: file.createAt,
          title: file.title,
          id: file.id,
          type: file.fileType,
        }
      }),
    )
    return files
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return await this.filesService.findOne(+id)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return await this.filesService.update(+id, updateFileDto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return await this.filesService.remove(+id)
  }
}
