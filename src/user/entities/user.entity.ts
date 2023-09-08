import { File } from 'src/files/entities/file.entity'
import { Page } from 'src/pages/entities/page.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

export enum UserRoleListEnum {
  ADMIN = 'admin',
  EDITOR = 'editor',
  GHOST = 'ghost',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number

  @Column()
  email: string

  @Column()
  password: string

  @Column({
    type: 'enum',
    enum: UserRoleListEnum,
    default: UserRoleListEnum.GHOST,
  })
  role: UserRoleListEnum

  @Column()
  fullName: string

  @Column({ nullable: true })
  avatarUrl?: string

  @CreateDateColumn()
  createAt: Date

  @OneToMany(() => Page, (page) => page.user, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'page_id' })
  pages: Page[]

  @OneToMany(() => File, (file) => file.user, { onDelete: 'CASCADE' })
  files: File[]
}
