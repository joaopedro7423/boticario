import { NextFunction, Request, Response, Express } from 'express'

export default (app: Express): void => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ error: 'Route not Found' })
  })
}
