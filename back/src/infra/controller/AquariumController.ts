import { ListAquariumsController } from '../../application'
import { AquariumRepository } from '../../domain/contracts/repository'
import { setupListAquariums } from '../../domain/usecases'
import { Http } from '../http/Http'

export default class AquariumController {
  constructor (
    readonly http: Http,
    readonly aquariumRepository: AquariumRepository
  ) {
    http.on('get', '/aquariums', async () => {
      const listAquariumsUseCase = setupListAquariums(aquariumRepository)
      const controller = new ListAquariumsController(listAquariumsUseCase)
      return controller.execute()
    })
  }
}
