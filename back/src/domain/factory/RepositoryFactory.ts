import { AquariumRepository, IndicatorRepository } from '../repository'

export default interface RepositoryFactory {
  createAquariumRepository: () => AquariumRepository
  createIndicatorRepository: () => IndicatorRepository
}
