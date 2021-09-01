import express , { Express } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import methodOverride from 'method-override'

export default (app: Express): void => {
  app.use(helmet())
  app.use(cors())
  app.use(methodOverride('_method'))
  app.use(methodOverride('X-HTTP-Method'))
  app.use(methodOverride('X-HTTP-Method-Override'))
  app.use(methodOverride('X-Method-Override'))
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
}
