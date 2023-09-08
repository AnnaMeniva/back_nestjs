import { User, UserRoleListEnum } from 'src/user/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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
  title: string

  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updateAt: Date

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
