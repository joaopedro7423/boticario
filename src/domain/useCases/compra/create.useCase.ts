import { DtoCadastro } from '@/application/useCases/compra/protocols/cadastro'

export interface CreateCompraUseCase {
  create: (compra: DtoCadastro) => Promise<string>
}
