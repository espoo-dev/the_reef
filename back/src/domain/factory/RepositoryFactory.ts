import { AquariumRepository, IndicatorRepository, IndicatorHistoricRepository, FanRepository } from '../repository'

export default interface RepositoryFactory {
  createAquariumRepository: () => AquariumRepository
  createIndicatorRepository: () => IndicatorRepository
  createIndicatorHistoricRepository: () => IndicatorHistoricRepository
  createFanRepository: () => FanRepository
}
