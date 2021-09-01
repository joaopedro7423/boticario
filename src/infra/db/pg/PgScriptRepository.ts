import { TEntityFieldsNames } from './protocols/EntityFieldsName'
import { BaseEntity } from './BaseEntity'
import { TFindOptions } from './protocols/FindOptions'

export default abstract class PgScriptRepository<T extends BaseEntity> {
  constructor (private readonly tableName: string) {}

  protected generateInsert (fields: Array<TEntityFieldsNames<T>>, returning?: Array<TEntityFieldsNames<T>>, upSert?: Array<TEntityFieldsNames<T>>): string {
    const params = fields.map((_, index) => {
      return '$'.concat((index + 1).toString())
    })

    return `INSERT INTO ${this.tableName} (${fields.toString()}) VALUES(${params.toString()}) 
    ${upSert ? `ON CONFLICT (${upSert.toString()}) DO NOTHING ` : ''} ${returning ? `Returning ${returning.toString()}` : ''};`
  }

  protected generateSelect (fields: Array<TEntityFieldsNames<T>>, options?: Omit<TFindOptions<T>, 'params'>): string {
    let sql: string = `SELECT ${fields.toString()} FROM ${this.tableName}`

    if (options?.where) {
      sql += ` where ${options.where}`
    }

    if (options?.orderBy) {
      const order = new Array<string>()
      Object.values(options.orderBy).forEach((value) => {
        order.push(`${Object.keys(value)} ${Object.values(value)}`)
      })
      sql += ` order by ${order.join()}`
    }

    if (options?.limit) {
      sql += ` LIMIT ${options.limit}`
    }

    if (options?.offset) {
      sql += ` offset ${options.offset}`
    }

    return sql
  }

  protected generateUpdate (fields: Array<TEntityFieldsNames<T>>, whereFields: Array<TEntityFieldsNames<T>>): string {
    let sql: string = `update ${this.tableName} set `
    let lastIndex: number = 0

    fields.forEach((value, index) => {
      lastIndex = index++
      sql += `${value} = $${lastIndex + 1}, `
    })

    const whereScript = whereFields.map((value) => {
      lastIndex++
      return `${value} = $${lastIndex + 1}`
    })
    sql = `${sql.trim().slice(0 , -1)} where ${whereScript.join(' and ')}`

    return sql
  }

  protected genereteDelete (fields: Array<TEntityFieldsNames<T>>): string {
    const params = fields.map((value, index) => {
      return `${value} = $${(index + 1)}`
    })

    return `DELETE FROM ${this.tableName} where ${params.join(' and ')}`
  }
}
