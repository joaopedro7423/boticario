import { NextFunction, Request, Response, Express } from 'express'
import * as fs from 'fs'

export default (app: Express): void => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    try {
      fs.appendFileSync('log.txt', `${new Date()} Method: ${req.method} -  URL: ${req.url} - IP ${req.ip} \n`)
    } finally {
      next()
    }
  })
}
