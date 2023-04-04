import { Fan } from '../../domain/entity'
import { FanRepository } from 'domain/repository'
import { Http } from 'infra/http'

export class FanController {
  constructor (
    readonly http: Http,
    readonly fanRepository: FanRepository
  ) {
    http.on('get', '/fans', async () => {
      const output = await fanRepository.list()
      return output
    })

    http.on('post', '/fans', async (params: any, body: AddFanInput) => {
      const newFan = new Fan(1, body.name, body.aquarium_id)
      const output = await fanRepository.save(newFan)
      return output
    })
  }
}

interface AddFanInput {
  name: string
  aquarium_id: number
}
