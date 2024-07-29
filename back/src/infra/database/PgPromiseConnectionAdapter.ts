import pgp from 'pg-promise'
import { Connection } from './Connection'

export class PgPromiseConnectionAdapter implements Connection {
  pgp: any;

  constructor () {
    const connectionConf = {
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      ssl: {
        rejectUnauthorized: false,
        ca: process.env.DATABASE_CA,
      },
    };
    console.log('connectionConf -> ', connectionConf);
    this.pgp = pgp()(connectionConf as any)
    // this.pgp = pgp()(process.env.DATABASE_URL ?? 'postgres://postgres:123456@localhost:5432/myreef')
  }

  async query (statement: string, params: any): Promise<any> {
    return this.pgp.query(statement, params)
  }

  async close (): Promise<void> {
    return this.pgp.$pool.end()
  }
}
