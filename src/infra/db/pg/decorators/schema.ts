
import { BaseEntity } from '../BaseEntity'

export function schema (name: string = 'public'): any {
  return function <T extends new (...args: any[]) => BaseEntity>(target: T): T {
    return class extends target {
      schema: string
      table: string

      constructor (...args: any[]) {
        super(...args)
        this.schema = name.trim()
        this.table = target.name
      }
    }
  }
}
