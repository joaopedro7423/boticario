import { NextFunction, Request, Response, Express } from 'express'
import { AppError } from '@/application/errors/AppError'
import * as fs from 'fs'

export default (app: Express): void => {
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    let msg: string
    let statusCod: number

    if (err instanceof AppError) {
      msg = err.message
      statusCod = err.statusCode
    } else {
      msg = process.env.NODE_ENV === 'production' ? 'Internal server error' : `Internal server error - ${err.message}`
      statusCod = 500
    }

    fs.appendFileSync('log.txt', `${new Date()} Method: ${req.method} -  URL: ${req.url} - IP ${req.ip} ERRO: ${msg} \n`)
    return res.status(statusCod).json({ error: msg })
  })
}
