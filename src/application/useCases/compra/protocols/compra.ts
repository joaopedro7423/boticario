import { DtoCadastro } from './cadastro'
import { cashback } from './cashback'

export interface compra{
  compra: Array<Omit<DtoCadastro, 'cpf'>>
  cashback: cashback
}
