import { AquariumRepository } from '@/domain/repository'
import { Http } from '../http/Http'

export default class AquariumController {
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
