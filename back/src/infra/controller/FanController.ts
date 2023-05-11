import RepositoryFactory from '../../domain/factory/RepositoryFactory'
import { InputUpdateFanOn, UpdateFanOn } from '../../application/UpdateFanOn'
import { Fan } from '../../domain/entity'
import { Http } from 'infra/http'

export class FanController {
  constructor (
    readonly http: Http,
    readonly repositoryFactory: RepositoryFactory
  ) {
    const fanRepository = repositoryFactory.createFanRepository()

    http.on('get', '/fans', async () => {
      const output = await fanRepository.list()
      return output
    })

    http.on('post', '/fans', async (params: any, body: AddFanInput) => {
      const newFan = new Fan(1, body.name, body.aquarium_id)
      const output = await fanRepository.save(newFan)
      return output
    })

    http.on('put', '/fans/update_on', async (params: any, body: InputUpdateFanOn) => {
      const updateFanOn = new UpdateFanOn(repositoryFactory)
      const output = await updateFanOn.execute({
        fanId: body.fanId,
        on: body.on
      })
      return output
    })
  }
}

interface AddFanInput {
  name: string
  aquarium_id: number
}
