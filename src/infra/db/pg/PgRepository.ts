import pg from './pgDB'
import PgScriptRepository from './PgScriptRepository'
import { BaseEntity, TConstructorEntity, TEntityFieldsNames, TFindOptions, TEntityObjectFieldsName, TInsertTable, IRepository } from './protocols'
import { QueryResult } from 'pg'
import { IPgQuery } from './protocols/pgQuery'

export class PgRepository<T extends BaseEntity> extends PgScriptRepository<T> implements IRepository<T> {
  private readonly schemaTableName: string
  constructor (Entity: TConstructorEntity<T>) {
    const entity = new Entity()
    const schema = Object.getOwnPropertyDescriptor(entity, 'schema')?.value
    const tableName = Object.getOwnPropertyDescriptor(entity, 'table')?.value
    super(`${schema}.${tableName}`)
    this.schemaTableName = `${schema}.${tableName}`
  }

  public async save (obj: Partial<T>, { returning, upSert }: Partial<TInsertTable<T>>): Promise<void> {
    const fields = Object.keys(obj) as Array<TEntityFieldsNames<T>>
    const params = Object.values(obj)
    const sql = this.generateInsert(fields, returning, upSert)
    const res = await pg.query({ text: sql, values: params })

    if (res?.rows) {
      Object.assign(obj, res.rows[0])
    }
  }

  public async insert ({ columns, returning, upSert }: TInsertTable<T>): Promise<T> {
    const fields = Object.keys(columns)
    const params = Object.values(columns)

    const sql = this.generateInsert(fields as Array<TEntityFieldsNames<T>>, returning, upSert)
    const res = await pg.query({ text: sql, values: params })
    const obj = Object.create({})

    if (res.rows[0] && returning) {
      Object.assign(obj, res.rows[0], columns) as T
    } else {
      return Object.assign(obj, columns) as T
    }
    return obj
  }

  public async select (columns: Array<TEntityFieldsNames<T>>, options?: TFindOptions<T>): Promise<T[]> {
    const sql = this.generateSelect(columns, options)
    return (await pg.query({ text: sql, values: options?.params })).rows as T[]
  }

  public async modify (obj: T, where: TEntityObjectFieldsName<T>): Promise<void> {
    const fields = Object.keys(obj)
    const whereFields = Object.keys(where)
    const params = [...Object.values(obj), ...Object.values(where)]
    const sql = this.generateUpdate(fields as Array<TEntityFieldsNames<T>>, whereFields as Array<TEntityFieldsNames<T>>)
    await pg.query({ text: sql, values: params })
  }

  public async update (columns: TEntityObjectFieldsName<T>, where: TEntityObjectFieldsName<T>): Promise<void> {
    const fields = Object.keys(columns) as Array<TEntityFieldsNames<T>>
    const whereFields = Object.keys(where) as Array<TEntityFieldsNames<T>>
    const params = [...Object.values(columns), ...Object.values(where)]
    const sql = this.generateUpdate(fields, whereFields)
    await pg.query({ text: sql, values: params })
  }

  public async remove (obj: T): Promise<void> {
    const fields = Object.keys(obj) as Array<TEntityFieldsNames<T>>
    const params = Object.values(obj)

    const sql = this.genereteDelete(fields)
    await pg.query({ text: sql, values: params })
  }

  public async delete (columns: TEntityObjectFieldsName<T>): Promise<void> {
    const fields = Object.keys(columns) as Array<TEntityFieldsNames<T>>
    const params = Object.values(columns)
    const sql = this.genereteDelete(fields)
    await pg.query({ text: sql, values: params })
  }

  public async query ({ text, values }: IPgQuery): Promise<QueryResult<any>> {
    return await pg.query({ text: text, values: values })
  }
}
