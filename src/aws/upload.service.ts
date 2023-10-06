import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { InjectRepository } from '@nestjs/typeorm'
import { FilesService } from '../files/files.service'

@Injectable()
export class UploadService {
  private readonly s3Client = new S3Client({
    region: this.configService.get('AWS_S3_REGION'),
    credentials: {
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_KEY'),
    },
  })
  constructor(
    private readonly fileService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  async upload(file: Buffer, title: string, id: number, mineType:string) {
    const newFile = await this.fileService.create(
      {
        title,
      },
      id,
    )

    const uploadParams = {
      Body: file,
      Bucket: this.configService.get('AWS_FILE_BUCKET_NAME'),
      Key: `${id}/${newFile.id}`,
      ContentType: mineType,
    }

    return this.s3Client.send(new PutObjectCommand(uploadParams))
  }

  async getObjectSignedUrl(key: string) {
    const params = {
      Bucket: this.configService.get('AWS_FILE_BUCKET_NAME'),
      Key: key,
    }

    const command = new GetObjectCommand(params)
    const seconds = 60
    const url = await getSignedUrl(this.s3Client, command, {
      expiresIn: seconds,
    })

    return url
  }
}
