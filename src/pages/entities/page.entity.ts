import { User, UserRoleListEnum } from 'src/user/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

export enum StatusEnum {
  PUBLISHED = 'published',
  UNPUBLISHED = 'unpublished',
}

@Entity()
export class Page {
  @PrimaryGeneratedColumn({ name: 'page_id' })
  id: number

  @Column()
  pageTitle: string

  @CreateDateColumn()
  createAt: Date

  @Column()
  author: string
  role: UserRoleListEnum

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.UNPUBLISHED,
  })
  status: StatusEnum

  @ManyToOne(() => User, (User) => User.pages)
  @JoinColumn({ name: 'user_id' })
  user: User
}
