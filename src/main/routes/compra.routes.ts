import { Router } from 'express'
import { CompraController } from '@/presentation/controllers/createCompra.controller'
import { ListaCompraController } from '@/presentation/controllers/listaCompra.controller'
import { AcumuladorController } from '@/presentation/controllers/acumuladorExternal.controller'
import asyncHandler from '../adapters/async-Handler'
import verifyJWT from '@/presentation/middlewares/verifyJWT'

const createCompra = new CompraController()
const listaCompra = new ListaCompraController()
const acumulador = new AcumuladorController()

export default (router: Router): void => {
  router
    .post('/compra', verifyJWT, asyncHandler(createCompra.handle))
    .get('/compra/listar', verifyJWT, asyncHandler(listaCompra.handle))
    .get('/compra/acumulador', verifyJWT, asyncHandler(acumulador.handle))
}
