import { IndicatorRepository } from '@/domain/repository'
import { Http } from '@/infra/http'

export class IndicatorController {
  constructor (
    readonly http: Http,
    readonly indicatorRepository: IndicatorRepository
  ) {
    http.on('get', '/indicators', async () => {
      const output = await indicatorRepository.list()
      return output
    })
  }
}
