import { Pool, PoolClient, QueryResult } from 'pg'
import { IPgQuery } from './protocols/pgQuery'

class PostgresDB {
  public pool!: Pool

  private static instance: PostgresDB

  private constructor () {}

  public static getInstance (): PostgresDB {
    return this.instance || (this.instance = new PostgresDB())
  }

  public async connect (): Promise<void> {
    this.pool = new Pool({
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: Number(process.env.PGPORT),
      max: Number(process.env.PGMAXCLIENT),
      idleTimeoutMillis: Number(process.env.PGTIMEOUT)
    })
  }

  public async disconect (): Promise<void> {
    await this.pool.end().then(() => console.log('Conexão Finalizada'))
  }

  public async getClient (): Promise<PoolClient> {
    return await this.pool.connect()
  }

  public async query (data: IPgQuery): Promise<QueryResult<any>> {
    return await this.pool.query(data)
  }
}

export default PostgresDB.getInstance()
