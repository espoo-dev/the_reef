export interface IAuth {
  checkToken: (token: string) => Error | User | any
  generateToken: () => {token: string}
  can: (token: string) => boolean
}

export interface User {
  name: string
}
