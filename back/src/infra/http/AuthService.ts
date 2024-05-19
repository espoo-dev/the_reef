import { IAuth } from './IAuth'
import jwt from 'jsonwebtoken'

export class AuthService implements IAuth {
  private readonly secretKey = 'mySecretKey';

  generateToken (): {token: string} {
    const token = jwt.sign({ login: 'aaaa' }, this.secretKey, { expiresIn: '7d' })
    return { token: token }
  }

  checkToken (token: string): any {
    const decoded = jwt.verify(token, this.secretKey) as any
    if (decoded) {
      return { name: 'iury', login: decoded.login }
    }
    return { error: 401, decoded }
  }

  can (token: string): boolean {
    return !!jwt.verify(token, this.secretKey)
  }
}
