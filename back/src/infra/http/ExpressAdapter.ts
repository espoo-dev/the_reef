import express from 'express'
import { Http } from './Http'

export class ExpressAdapter implements Http {
  private readonly app: any;

  constructor () {
    this.app = express()
    this.app.use(express.json())
    this.app.use(function (req: any, res: any, next: any) {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

      const bodyParams = Object.keys(req.body)
      bodyParams.forEach((key) => {
        if (req.body[key] === 'false') {
          req.body[key] = false
        }
      })

      if (req.headers.authorization !== process.env.SECRET_KEY && req.method === 'PUT') {
        return res.status(403).json({ error: 'No credentials sent!' })
      }
      next()
    })
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
