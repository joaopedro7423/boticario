import { TInsertTable } from './InsertWithReturning'
import { BaseEntity } from '../BaseEntity'
import { TFindOptions } from './FindOptions'
import { TEntityFieldsNames } from './EntityFieldsName'
import { TEntityObjectFieldsName } from './EntityObjectFieldsName'

export interface IRepository<T extends BaseEntity> {
  save: (obj: T, { returning }: Partial<TInsertTable<T>>) => Promise<void>
  insert: ({ columns, returning }: TInsertTable<T>) => Promise<Object>
  select: (columns: Array<TEntityFieldsNames<T>>, options?: TFindOptions<T>) => Promise<T[] | T>
  modify: (obj: T, where: TEntityObjectFieldsName<T>) => Promise<void>
  update: (columns: TEntityObjectFieldsName<T>, where: TEntityObjectFieldsName<T>) => Promise<void>
  remove: (obj: T) => Promise<void>
  delete: (columns: TEntityObjectFieldsName<T>) => Promise<void>
}
