import { CompraRepository } from '@/infra/db/pg/repositories/compra.repository'
import { CreateCompra } from '@/application/useCases/compra/createCompra'

export const createCompraFactory = (): CreateCompra => new CreateCompra(new CompraRepository())
