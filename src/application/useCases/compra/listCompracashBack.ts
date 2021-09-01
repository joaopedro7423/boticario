import { getMes } from '@/application/helpers/utilsDate'
import { DtoCadastro } from '@/application/useCases/compra/protocols/cadastro'
import { ListCashBackUseCase } from '@/domain/useCases/compra/list.useCase'
import { CompraRepository } from '@/infra/db/pg/repositories/compra.repository'
import { compra } from './protocols/compra'

export class ListCompraCashBack implements ListCashBackUseCase {
  constructor (private readonly compraRepository: CompraRepository) {}

  async list (): Promise<Object> {
    const mapCompra = new Map<string, compra>()
    const dadosCompra = new Array<Omit<DtoCadastro, 'cpf'>>()
    let porc: number
    let valorCashback: number

    const dadosMes = await this.compraRepository.ListSumMes()

    for (const item of dadosMes) {
      const dadosDetalhe = await this.compraRepository.ListMesDetalhe(item.mes)

      for (const itemMes of dadosDetalhe) {
        dadosCompra.push({
          codigo: itemMes.codigo,
          data: itemMes.data,
          valor: itemMes.valor
        })
      }

      if (item.valor > 1500) {
        porc = 20
      } else if (item.valor > 1000) {
        porc = 15
      } else if (item.valor === 1000) {
        porc = 10
      } else {
        porc = 0
      }

      if (porc > 0) {
        valorCashback = ((item.valor / 100) * porc)
      } else {
        valorCashback = 0
      }

      mapCompra.set(getMes(item.mes), {
        compra: [...dadosCompra],
        cashback: {
          soma_vendas: item.valor,
          porcentagem: porc,
          valor_cashback: parseFloat(valorCashback.toFixed(2))
        }
      })

      dadosCompra.length = 0
    }

    return Object.assign({}, Object.fromEntries(mapCompra))
  }
}
