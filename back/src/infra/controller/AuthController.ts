import { Http, IAuth } from 'infra/http'

export class AuthController {
  constructor (
    readonly http: Http,
    readonly auth: IAuth
  ) {
    http.on('post', '/login', async () => {
      return auth.generateToken()
    })

    http.on('get', '/session', async (params: any, body: any) => {
      try {
        return auth.checkToken(body.tk)
      } catch (error) {
        return { error: error }
      }
    })
  }
}
