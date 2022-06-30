import { UpdateIndicatorValue } from '../../application/UpdateIndicatorValue'
import RepositoryFactory from 'domain/factory/RepositoryFactory'
import { Http } from 'infra/http'

export class IndicatorController {
  constructor (
    readonly http: Http,
    readonly repositoryFactory: RepositoryFactory
  ) {
    http.on('get', '/indicators', async () => {
      const indicatorRepository = repositoryFactory.createIndicatorRepository()
      const output = await indicatorRepository.list()
      return output
    })

    http.on('put', '/indicators/update', async (params: any, body: any) => {
      const updateIndicatorValue = new UpdateIndicatorValue(repositoryFactory)
      const output = await updateIndicatorValue.execute(body)
      return output
    })
  }
}
