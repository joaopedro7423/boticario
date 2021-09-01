import { Router } from 'express'
import { CreateRevendedorController } from '@/presentation/controllers/createRevendedor.controller'
import { LoginRevendedorController } from '@/presentation/controllers/loginRevendedor.controller'
import asyncHandler from '../adapters/async-Handler'
import verifyJWT from '@/presentation/middlewares/verifyJWT'

const createRevendedor = new CreateRevendedorController()
const loginRevendedor = new LoginRevendedorController()

export default (router: Router): void => {
  router.post('/revendedor', verifyJWT, asyncHandler(createRevendedor.handle))
    .post('/revendedor/login', asyncHandler(loginRevendedor.handle))
}
