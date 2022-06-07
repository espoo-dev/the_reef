import { AddIndicatorToAquariumUseCase } from '@/domain/usecases'

type HttpRequest = {
  aquariumId: number
  indicatorId: number
}

export class AddIndicatorToAquarium {
  constructor (private readonly addIndicatorToAquarium: AddIndicatorToAquariumUseCase) {}

  async execute ({ aquariumId, indicatorId }: HttpRequest): Promise<void> {
    await this.addIndicatorToAquarium({ aquariumId, indicatorId })
  }
}
