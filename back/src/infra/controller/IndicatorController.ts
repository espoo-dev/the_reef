import { UpdateIndicatorValue } from '../../application/UpdateIndicatorValue'
import RepositoryFactory from 'domain/factory/RepositoryFactory'
import { Http } from 'infra/http'
import { Indicator } from '../../domain/entity'

export class IndicatorController {
  constructor (
    readonly http: Http,
    readonly repositoryFactory: RepositoryFactory
  ) {
    const indicatorRepository = repositoryFactory.createIndicatorRepository()

    http.on('get', '/indicators', async () => {
      const output = await indicatorRepository.list()
      return output
    })

    http.on('post', '/indicators', async (params: any, body: AddIndicatorInput) => {
      const newIndicator = new Indicator(
        body.id,
        body.aquariumId,
        body.name,
        body.unit,
        body.description,
        body.currentValue,
        body.acceptedValue,
        body.minValue,
        body.maxValue
      )
      const output = await indicatorRepository.save(newIndicator)
      return output
    })

    http.on('put', '/indicators/update', async (params: any, body: any) => {
      const updateIndicatorValue = new UpdateIndicatorValue(repositoryFactory)
      const output = await updateIndicatorValue.execute(body)
      return output
    })
  }
}

interface AddIndicatorInput {
  aquariumId: number
  name: string,
  unit: string,
  description: string,
  currentValue: number
  acceptedValue: number
  minValue: number
  maxValue: number
}
