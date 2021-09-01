import { PgRepository } from '@/infra/db/pg/PgRepository'
import { Revendedor } from '@/domain/entities/revendedor.entity'
import { LoadLogin } from '@/domain/useCases/revendedor/loadLogin'
import { sign } from 'jsonwebtoken'

export class RevendedorRepository {
  private readonly repository: PgRepository<Revendedor>

  constructor () {
    this.repository = new PgRepository(Revendedor)
  }

  async existsCPF (cpf: string): Promise<boolean> {
    const res = await this.repository.select(['id'], {
      where: 'cpf = $1',
      params: [cpf]
    })

    return res.length > 0
  }

  async existsLogin (login: string): Promise<boolean> {
    login = login.trim().toUpperCase()
    const res = await this.repository.select(['id'], {
      where: 'upper(login) = $1',
      params: [login]
    })

    return res.length > 0
  }

  async create (data: Partial<Revendedor>): Promise<Revendedor> {
    await this.repository.save(data, { returning: ['id'] })
    return data as Revendedor
  }

  async login (login: string, password: string): Promise<LoadLogin | null> {
    const res = await this.repository.select(['nome', 'id'], {
      where: 'login = $1 and senha = $2',
      params: [login, password]
    })

    if (res.length === 0) {
      return null
    } else {
      return {
        id: res[0].id as string,
        nome: res[0].nome as string,
        token: this.createToken(res[0].id as string)

      }
    }
  }

  private createToken (id: string): string {
    const token = sign({}, process.env.JWTSECRET as string, {
      subject: id,
      expiresIn: '4h'
    })
    return token
  }
}
