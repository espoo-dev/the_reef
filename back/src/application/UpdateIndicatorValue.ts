import RepositoryFactory from 'domain/factory/RepositoryFactory'
import { IndicatorRepository } from 'domain/repository'

export class UpdateIndicatorValue {
  indicatorRepository: IndicatorRepository

  constructor (readonly repositoryFactory: RepositoryFactory) {
    this.indicatorRepository = repositoryFactory.createIndicatorRepository()
  }

  async execute (input: Input): Promise<Output> {
    const indicator = await this.indicatorRepository.get(input.indicatorId)
    indicator.update(input.newValue)
    const indicatorUpdated = await this.indicatorRepository.updateValue(indicator.id, indicator.currentValue)

    return {
      indicatorId: indicatorUpdated.id,
      currentValue: indicatorUpdated.currentValue,
      isOk: indicatorUpdated.isOk()
    }
  }
}

type Input = {
  indicatorId: number
  newValue: number
}

type Output = {
  indicatorId: number
  currentValue: number
  isOk: boolean
}
