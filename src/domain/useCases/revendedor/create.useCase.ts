import { Revendedor } from '@/domain/entities/revendedor.entity'

export interface CreateUserUseCase {
  create: (revendedor: Partial<Revendedor>) => Promise<Revendedor>
}
