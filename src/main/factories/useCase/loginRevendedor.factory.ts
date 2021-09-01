import { RevendedorRepository } from '@/infra/db/pg/repositories/revendedor.repository'
import { LoginRevendedor } from '@/application/useCases/revendedor/loginRevendedor'

export const loginRevendedorFactory = (): LoginRevendedor => new LoginRevendedor(new RevendedorRepository())
