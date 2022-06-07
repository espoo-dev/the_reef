import { AddFishUseCase } from '@/domain/usecases'

type HttpRequest = {
  aquariumId: number
  name: string
  species: string
  litersRequired: number
}

export class AddFishController {
  constructor (private readonly addFish: AddFishUseCase) {}

  async execute ({ aquariumId, name, species, litersRequired }: HttpRequest): Promise<void> {
    await this.addFish({ aquariumId, name, species, litersRequired })
  }
}
