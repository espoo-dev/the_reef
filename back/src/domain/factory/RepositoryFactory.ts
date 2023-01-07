import { AquariumRepository, IndicatorRepository, IndicatorHistoricRepository } from '../repository'

export default interface RepositoryFactory {
  createAquariumRepository: () => AquariumRepository
  createIndicatorRepository: () => IndicatorRepository
  createIndicatorHistoricRepository: () => IndicatorHistoricRepository
}
