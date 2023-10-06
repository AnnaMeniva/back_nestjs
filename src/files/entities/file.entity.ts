import { IsOptional } from 'class-validator'
import { User } from 'src/user/entities/user.entity'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

export enum FileTypeEnum {
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  FILE = 'file',
}

@Entity()
export class File {
  @PrimaryGeneratedColumn({name: 'file_id'})
  id: number

  @Column()
  @IsOptional()
  fileUrl: string

  @Column()
  title: string

  @CreateDateColumn()
  createAt: Date

  @Column({
    type: 'enum',
    enum: FileTypeEnum,
  })
  @IsOptional()
  fileType: FileTypeEnum

  @ManyToOne(() => User, (User) => User.files)
  @JoinColumn({ name: 'user_id' })
  user: User
}
