import './main/config/module-alias'
import 'reflect-metadata'

import { AquariumController, IndicatorController } from '@/infra/controller'
import { PgPromiseConnectionAdapter } from '@/infra/database'
import { ExpressAdapter } from '@/infra/http'
import { AquariumRepositoryDatabase } from '@/infra/repository/database'
import DatabaseRepositoryFactory from './infra/factory/DatabaseRepositoryFactory'

const http = new ExpressAdapter()
const connection = new PgPromiseConnectionAdapter()

const aquariumRepository = new AquariumRepositoryDatabase(connection)

const repositoryFactory = new DatabaseRepositoryFactory(connection)

new AquariumController(http, aquariumRepository)
new IndicatorController(http, repositoryFactory)

http.on('get', '/', () => {
  return {
    message: 'MyReef API'
  }
})

const port = Number(process.env.PORT) || 3000
http.listen(port)
console.log(`Running on port ${process.env.PORT}`)
