import { Module } from '@nestjs/common'
import { FilesService } from './files.service'
import { FilesController } from './files.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { File } from './entities/file.entity'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UploadService } from 'src/aws/upload.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([File]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '30d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [FilesController],
  providers: [FilesService, UploadService],
  exports: [FilesService, UploadService],
})
export class FilesModule {}
