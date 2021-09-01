import { AppError } from '@/application/errors/AppError'
import { LoadLogin } from '@/domain/useCases/revendedor/loadLogin'
import { LoginUseCase } from '@/domain/useCases/revendedor/login.useCase'
import { RevendedorRepository } from '@/infra/db/pg/repositories/revendedor.repository'

export class LoginRevendedor implements LoginUseCase {
  constructor (private readonly revendedorRepository: RevendedorRepository) {}

  async login (login: string, password: string): Promise<LoadLogin> {
    const data = await this.revendedorRepository.login(login, password)

    if (data) {
      return data
    } else {
      throw new AppError('Usuario não Encontrado', 401)
    }
  }
}
