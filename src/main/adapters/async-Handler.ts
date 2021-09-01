import { Request, NextFunction, Response, RequestHandler } from 'express'

const asyncHandler = (callback: RequestHandler) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    return Promise.resolve(callback(req, res, next))
      .catch(next)
  }
}

export default asyncHandler
