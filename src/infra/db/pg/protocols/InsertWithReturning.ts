import { BaseEntity } from '../BaseEntity'
import { TEntityFieldsNames } from './EntityFieldsName'
import { TEntityObjectFieldsName } from './EntityObjectFieldsName'

export type TInsertTable<T extends BaseEntity> = {
  columns: TEntityObjectFieldsName<T>
  returning?: Array<TEntityFieldsNames<T>>
  upSert?: Array<TEntityFieldsNames<T>>
}
