import { BaseEntity, schema } from '@/infra/db/pg/protocols'
@schema()
export class Revendedor extends BaseEntity {
  id !: string | null
  nome !: string | null
  cpf !: string | null
  email!: string | null
  login!: string | null
  senha!: string | null
}
