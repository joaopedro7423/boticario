import { RevendedorRepository } from '@/infra/db/pg/repositories/revendedor.repository'
import { CreateRevendedor } from '@/application/useCases/revendedor/createRevendedor'

export const createRevendedorFacotry = (): CreateRevendedor => new CreateRevendedor(new RevendedorRepository())
