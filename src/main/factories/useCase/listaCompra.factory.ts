import { CompraRepository } from '@/infra/db/pg/repositories/compra.repository'
import { ListCompraCashBack } from '@/application/useCases/compra/listCompracashBack'

export const createListaFactory = (): ListCompraCashBack => new ListCompraCashBack(new CompraRepository())
