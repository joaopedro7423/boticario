export abstract class BaseEntity {
  constructor (schema: string = 'public', table: string = '') {
    Object.defineProperties(this, {
      schema: {
        value: schema,
        enumerable: false,
        writable: true

      },
      table: {
        value: table,
        enumerable: false,
        writable: true

      }
    })
  }

  protected getTableName? (): string {
    const table = Object.getOwnPropertyDescriptor(this, 'schema')?.value
    const schema = Object.getOwnPropertyDescriptor(this, 'table')?.value

    return `${table}.${schema}`
  }
}
