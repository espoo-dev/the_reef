import { Indicator } from '@/domain/entity'
import RepositoryFactory from '@/domain/factory/RepositoryFactory'
import { AquariumRepository, IndicatorRepository } from '@/domain/repository'

export class AddIndicatorToAquarium {
  aquariumRepository: AquariumRepository;
  indicatorRepository: IndicatorRepository

  constructor (readonly repositoryFactory: RepositoryFactory) {
    this.aquariumRepository = repositoryFactory.createAquariumRepository()
    this.indicatorRepository = repositoryFactory.createIndicatorRepository()
  }

  async execute (input: Input): Promise<Output> {
    const aquarium = await this.aquariumRepository.get(input.aquariumId)
    const indicator = await this.indicatorRepository.get(input.indicatorId)

    aquarium.addIndicator(indicator)

    return {
      indicators: aquarium.getIndicators()
    }
  }
}

type Input = {
  aquariumId: number
  indicatorId: number
}

type Output = {
  indicators: Indicator[]
}
