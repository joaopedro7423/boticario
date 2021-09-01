import { BaseEntity } from '../BaseEntity'

export type TEntityFieldsNames<T extends BaseEntity> = {
  [P in keyof T]: P
}[keyof T]
