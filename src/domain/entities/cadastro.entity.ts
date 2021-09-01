import { BaseEntity, schema } from '@/infra/db/pg/protocols'

@schema('compra')
export class Cadastro extends BaseEntity {
  id!: string
  lancamento?: Date
  valor!: number
  status?: number
  revendedor!: string
  data!: Date
  codigo!: number
}
