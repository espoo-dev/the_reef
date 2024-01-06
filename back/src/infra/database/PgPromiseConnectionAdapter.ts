import pgp from 'pg-promise'
import { Connection } from './Connection'

export class PgPromiseConnectionAdapter implements Connection {
  pgp: any;

  constructor () {
    console.log('process.env.DATABASE_URL -> ', process.env.DATABASE_URL);
    this.pgp = pgp()(process.env.DATABASE_URL ?? 'postgres://postgres:123456@localhost:5432/myreef')
  }

  async query (statement: string, params: any): Promise<any> {
    return this.pgp.query(statement, params)
  }

  async close (): Promise<void> {
    return this.pgp.$pool.end()
  }
}
