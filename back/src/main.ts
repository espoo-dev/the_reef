import 'reflect-metadata'

import DatabaseRepositoryFactory from './infra/factory/DatabaseRepositoryFactory'
import { AuthService, ExpressAdapter } from './infra/http'
import { PgPromiseConnectionAdapter } from './infra/database'
import { AquariumRepositoryDatabase } from './infra/repository/database'
import { AquariumController, FanController, IndicatorController, AuthController } from './infra/controller'

const auth = new AuthService()
const http = new ExpressAdapter(auth)
const connection = new PgPromiseConnectionAdapter()

const aquariumRepository = new AquariumRepositoryDatabase(connection)
const repositoryFactory = new DatabaseRepositoryFactory(connection)

new AquariumController(http, aquariumRepository)
new IndicatorController(http, repositoryFactory)
new FanController(http, repositoryFactory)
new AuthController(http, auth)

http.on('get', '/', () => {
  return {
    message: 'MyReef API'
  }
})

http.secure('post', '/reefs', () => {
  return {
    reefs: []
  }
})

const port = Number(process.env.PORT) || 8080
http.listen(port)
console.log(`Running on port ${process.env.PORT}`)
