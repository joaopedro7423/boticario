import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { AppError } from '@/application/errors/AppError'
import { TokenPayload } from './protocols/tokenPayload'

export default function verifyJWT (request: Request, response: Response, next: NextFunction): any {
  const auth = request.headers.authorization

  const invalidToken = (): never => {
    throw new AppError('Invalid JWT token', 403)
  }

  if (auth) {
    const [, token] = auth.split(' ')

    try {
      const decode = verify(token, process.env.JWTSECRET as string)
      const { sub } = decode as TokenPayload

      request.user = {
        id: sub
      }

      return next()
    } catch {
      invalidToken()
    }
  } else {
    invalidToken()
  }
}
