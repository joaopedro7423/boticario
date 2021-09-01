import { AppError } from '@/application/errors/AppError'
import { onlyNumbers } from '@/application/helpers/utilString'
import { CreateCompraUseCase } from '@/domain/useCases/compra/create.useCase'
import { CompraRepository } from '@/infra/db/pg/repositories/compra.repository'
import { DtoCadastro } from './protocols/cadastro'

export class CreateCompra implements CreateCompraUseCase {
  private readonly cpfAprovado = '15350946056'
  constructor (private readonly compraRepository: CompraRepository) {}

  async create (compra: DtoCadastro): Promise<string> {
    compra.cpf = onlyNumbers(compra.cpf)
    const idVendedor = await this.compraRepository.findVendedor(compra.cpf)

    if (idVendedor) {
      const id = await this.compraRepository.create({
        revendedor: idVendedor,
        status: compra.cpf === this.cpfAprovado ? 2 : 1,
        valor: compra.valor,
        data: compra.data,
        codigo: compra.codigo
      })
      return id
    } else {
      throw new AppError('Vendedor não Encontrato', 400)
    }
  }
}
