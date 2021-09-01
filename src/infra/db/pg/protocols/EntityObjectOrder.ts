import { BaseEntity } from '../BaseEntity'
import { TOrder } from './PgOrder'

export type TEntityObjectOrder<T extends BaseEntity> = {
  [P in keyof T]?: TOrder
}
