import { Aquarium, Dimensions } from '../../domain/entity'
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

    http.on('post', '/aquariums', async (params: any, body: AddAquariumInput) => {
      const newAquarium = new Aquarium(1, body.name, new Dimensions(body.dimensions.length, body.dimensions.width, body.dimensions.height))
      const output = await aquariumRepository.save(newAquarium)
      return output
    })
  }
}

interface AddAquariumInput {
  name: string
  dimensions: {
    length: number
    width: number
    height: number
  }
}
