import express from 'express'
import setupMiddleware from './middleware'
import setupRoutes from './routes'
import setupErrorHandler from '@/presentation/middlewares/errorHandler'
import setupRouteNotFound from '@/presentation/middlewares/routeNotFound'
import logApplication from '@/presentation/middlewares/logApplication'

const app = express()
logApplication(app)
setupMiddleware(app)
setupRoutes(app)
setupRouteNotFound(app)
setupErrorHandler(app)
export default app
