import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from 'src/user/user.service'
import * as argon2 from 'argon2'
import { JwtService } from '@nestjs/jwt'
import { IUser } from 'src/types/types'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findAll({ email })
    if (!user.length) throw new UnauthorizedException('user already exist')
    const passwordIsMatch = await argon2.verify(user[0].password, password)

    if (user.length && passwordIsMatch) {
      return user[0]
    }
    throw new UnauthorizedException('User or password are incorrect!')
  }
  async login(user: IUser) {
    const { id, email } = user
    return {
      id,
      email,
      token: this.jwtService.sign({ id: user.id, email: user.email }),
    }
  }
}
