import { BaseEntity } from '../BaseEntity'

export type TConstructorEntity<T extends BaseEntity> = new () => T
