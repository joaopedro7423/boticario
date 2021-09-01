import { BaseEntity } from '../BaseEntity'
import { TEntityObjectOrder } from './EntityObjectOrder'

export type TFindOptions<T extends BaseEntity> = {
  where?: string
  params?: any[]
  orderBy?: Array<TEntityObjectOrder<T>>
  limit?: number
  offset?: number

}
