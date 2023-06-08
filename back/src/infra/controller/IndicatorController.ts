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
    const indicatorHistoricRepository = repositoryFactory.createIndicatorHistoricRepository()

    http.on('get', '/indicators', async () => {
      const output = await indicatorRepository.list()
      return output
    })

    http.on('post', '/indicators', async (params: any, body: AddIndicatorInput) => {
      const newIndicator = new Indicator(
        1,
        body.aquariumId,
        body.name,
        body.unit,
        body.description,
        body.currentValue,
        body.acceptedValue,
        body.minValue,
        body.maxValue
      )
      return await indicatorRepository.save(newIndicator)
    })

    http.on('put', '/indicators/update', async (params: any, body: any) => {
      const updateIndicatorValue = new UpdateIndicatorValue(repositoryFactory)
      return await updateIndicatorValue.execute(body)
    })

    http.on('get', '/indicator/:id/list', async (req: { id: number }) => {
      return await indicatorHistoricRepository.list(req.id)
    })

    http.on('get', '/indicator/:id/historic', async (req: { id: number }) => {
      return await indicatorHistoricRepository.historic(req.id)
    })
  }
}

interface AddIndicatorInput {
  aquariumId: number
  name: string
  unit: string
  description: string
  currentValue: number
  acceptedValue: number
  minValue: number
  maxValue: number
}
