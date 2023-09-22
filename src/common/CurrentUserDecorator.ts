import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { CurrentUserInterface } from 'src/types/types'

export const CurrentUser = createParamDecorator(
 
  (data: unknown, context: ExecutionContext): CurrentUserInterface => {
    const request = context.switchToHttp().getRequest()
    return request.user
  },
)
