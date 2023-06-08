import RepositoryFactory from 'domain/factory/RepositoryFactory'
import { IndicatorHistoricRepository, IndicatorRepository } from 'domain/repository'

export class UpdateIndicatorValue {
  indicatorRepository: IndicatorRepository
  indicatorHistoricRepository: IndicatorHistoricRepository

  constructor (readonly repositoryFactory: RepositoryFactory) {
    this.indicatorRepository = repositoryFactory.createIndicatorRepository()
    this.indicatorHistoricRepository = repositoryFactory.createIndicatorHistoricRepository()
  }

  async execute (input: UpdateIndicatorValue.Input): Promise<UpdateIndicatorValue.Output> {
    const indicator = await this.indicatorRepository.get(input.indicatorId)
    indicator.update(input.newValue)
    const indicatorUpdated = await this.indicatorRepository.updateValue(indicator.id, indicator.currentValue)
    const historicId = await this.indicatorHistoricRepository.save(indicator.id, indicator.currentValue)

    return {
      indicatorId: indicatorUpdated.id,
      currentValue: indicatorUpdated.currentValue,
      isOk: indicatorUpdated.isOk(),
      historic_id: historicId
    }
  }
}

export namespace UpdateIndicatorValue {
  export type Input = {
    indicatorId: number
    newValue: number
  }

  export type Output = {
    indicatorId: number
    currentValue: number
    isOk: boolean
    historic_id: number
  }
}
