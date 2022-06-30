import { AquariumRepository } from 'domain/repository'
import { Http } from 'infra/http'

export class AquariumController {
  constructor (
    readonly http: Http,
    readonly aquariumRepository: AquariumRepository
  ) {
    http.on('get', '/aquariums', async () => {
      const output = await aquariumRepository.list()
      return output
    })
  }
}
