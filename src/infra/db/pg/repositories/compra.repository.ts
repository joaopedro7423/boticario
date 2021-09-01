import { PgRepository } from '@/infra/db/pg/PgRepository'
import { Cadastro } from '@/domain/entities/cadastro.entity'
import { dataMes } from '@/application/useCases/compra/protocols/sumMes'
export class CompraRepository {
  private readonly repository: PgRepository<Cadastro>

  constructor () {
    this.repository = new PgRepository(Cadastro)
  }

  async findVendedor (cpf: string): Promise<string | null> {
    const res = await this.repository.query({
      text: 'select id from public.revendedor where cpf = $1',
      values: [cpf]
    })

    return res.rowCount > 0 ? res.rows[0].id : null
  }

  async ListSumMes (): Promise<dataMes[]> {
    const resDadosMes = await this.repository.query({
      text: `select sum(valor) valor, extract(month from data) mes from compra.cadastro
      where extract(year from data)  = extract(year from current_date)
      group by mes order by mes asc`
    })

    return resDadosMes.rows
  }

  async ListMesDetalhe (mes: number): Promise<Cadastro[]> {
    const dados = await this.repository.select(['codigo', 'valor', 'data'],
      {
        where: 'extract(month from data)  = $1',
        params: [mes],
        orderBy: [{ data: 'ASC' }]
      }
    )

    return dados
  }

  async create (data: Partial<Cadastro>): Promise<string> {
    await this.repository.save(data, { returning: ['id'] })
    return data.id as string
  }
}
