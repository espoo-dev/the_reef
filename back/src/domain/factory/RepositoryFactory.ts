import { AquariumRepository, IndicatorRepository, IndicatorHistoricRepository, FanRepository, BuoyRepository } from '../repository'

export default interface RepositoryFactory {
  createAquariumRepository: () => AquariumRepository
  createIndicatorRepository: () => IndicatorRepository
  createIndicatorHistoricRepository: () => IndicatorHistoricRepository
  createFanRepository: () => FanRepository
  createBuoyRepository: () => BuoyRepository
}
