import { Indicator } from '@/domain/entity'
import { AquariumRepository, IndicatorRepository } from '@/domain/repository'

export class AddIndicatorToAquarium {
  constructor (
    private readonly aquariumRepository: AquariumRepository,
    private readonly indicatorRepository: IndicatorRepository
  ) {}

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
