import { config } from 'dotenv'
import './config/module-alias'
import pg from '@/infra/db/pg/pgDB'
config()

pg.connect().then(async () => {
  const app = (await import('./config/app')).default

  app.listen(process.env.API_PORT, () => {
    console.log(`HTTP Server running at ${process.env.API_URL}:${process.env.API_PORT}`)
  })
}).catch(console.error)
