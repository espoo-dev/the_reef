import AquariumController from './infra/controller/AquariumController'
import { PgPromiseConnectionAdapter } from './infra/database'
import { ExpressAdapter } from './infra/http/ExpressAdapter'
import { AquariumRepositoryDatabase } from './infra/repository/database'

const http = new ExpressAdapter()
const connection = new PgPromiseConnectionAdapter()
const aquariumRepository = new AquariumRepositoryDatabase(connection)

new AquariumController(http, aquariumRepository)

http.on('get', '/', () => {
  return { message: 'MyReef API' }
})

const port = Number(process.env.PORT) || 3000
http.listen(port)
console.log(`Running on port ${port}`)
