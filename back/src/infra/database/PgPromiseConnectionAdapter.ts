import { Connection } from '@/infra/database';

import pgp from 'pg-promise';

export class PgPromiseConnectionAdapter implements Connection {
  pgp: any;

  constructor() {
    this.pgp = pgp()("postgres://postgres:123456@localhost:5432/myreef")
  }
  query(statement: string, params: any): Promise<any> {
    return this.pgp.query(statement, params);
  }
  close(): Promise<void> {
    return this.pgp.$pool.end();
  }
}
