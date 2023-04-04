import 'reflect-metadata'

import DatabaseRepositoryFactory from './infra/factory/DatabaseRepositoryFactory'
import { ExpressAdapter } from './infra/http'
import { PgPromiseConnectionAdapter } from './infra/database'
import { AquariumRepositoryDatabase, FanRepositoryDatabase } from './infra/repository/database'
import { AquariumController, FanController, IndicatorController } from './infra/controller'

const http = new ExpressAdapter()
const connection = new PgPromiseConnectionAdapter()

const aquariumRepository = new AquariumRepositoryDatabase(connection)
const repositoryFactory = new DatabaseRepositoryFactory(connection)
const fanRepository = new FanRepositoryDatabase(connection)

new AquariumController(http, aquariumRepository)
new IndicatorController(http, repositoryFactory)
new FanController(http, fanRepository)

http.on('get', '/', () => {
  return {
    message: 'MyReef API'
  }
})

const port = Number(process.env.PORT) || 8080
http.listen(port)
console.log(`Running on port ${process.env.PORT}`)
