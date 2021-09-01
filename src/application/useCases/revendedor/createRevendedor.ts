import { onlyNumbers } from './../../helpers/utilString'
import { AppError } from './../../errors/AppError'
import { Revendedor } from '@/domain/entities/revendedor.entity'
import { CreateUserUseCase } from '@/domain/useCases/revendedor/create.useCase'
import { RevendedorRepository } from '@/infra/db/pg/repositories/revendedor.repository'

export class CreateRevendedor implements CreateUserUseCase {
  constructor (private readonly revendedorRepository: RevendedorRepository) {}

  async create (data: Partial<Revendedor>): Promise<Revendedor> {
    data.cpf = onlyNumbers(data.cpf as string)

    const login = data.login?.trim() as string

    const existsCPf = await this.revendedorRepository.existsCPF(data.cpf)

    if (existsCPf) {
      throw new AppError('Usuário já Cadastrado', 400)
    }

    const existsLogin = await this.revendedorRepository.existsLogin(login)

    if (existsLogin) {
      throw new AppError('Login já Cadastrado', 400)
    }

    const existsEmail = await this.revendedorRepository.existsEmail(data.email as string)

    if (existsEmail) {
      throw new AppError('Já existe um Usuário com esse e-mail', 400)
    }

    const revendedor = await this.revendedorRepository.create(data)
    return revendedor
  }
}
