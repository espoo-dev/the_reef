import { Http } from '@/infra/http'
import express from 'express'

export class ExpressAdapter implements Http {
  private readonly app: any;

  constructor () {
    this.app = express()
  }

  private parseUrl (url: string): string {
    return url.replace(/\{/g, ':').replace(/\}/g, '')
  }

  on (method: string, url: string, callback: Function): void {
    this.app[method](this.parseUrl(url), async function (req: any, res: any) {
      const output = await callback(req.params, req.body)
      res.json(output)
    })
  }

  listen (port: number): void {
    this.app.listen(port)
  }
}
