import { Buoy } from '../../domain/entity'
import { UpdateBuoyValue } from '../../application/UpdateBuoyValue'
import RepositoryFactory from 'domain/factory/RepositoryFactory'
import { Http } from 'infra/http'

export class BuoyController {
  constructor (
    readonly http: Http,
    readonly repositoryFactory: RepositoryFactory
  ) {
    const buoyRepository = repositoryFactory.createBuoyRepository()

    http.on('get', '/buoys', async () => {
      const output = await buoyRepository.list()
      return output
    })

    http.on('post', '/buoys', async (params: any, body: AddBuoyInput) => {
      const newBuoy = new Buoy(
        1,
        body.aquariumId,
        body.name,
        body.description,
        body.currentValue
      )
      return await buoyRepository.save(newBuoy)
    })

    http.on('put', '/buoys/update', async (params: any, body: any) => {
      const updateIndicatorValue = new UpdateBuoyValue(repositoryFactory)
      return await updateIndicatorValue.execute(body)
    })
  }
}

interface AddBuoyInput {
  aquariumId: number
  name: string
  description: string
  currentValue: boolean
}
