import { Fish } from '@/domain/entity'
import { AquariumRepository } from '@/domain/repository'

export class AddFish {
  constructor (private readonly aquariumRepository: AquariumRepository) {}

  async execute (input: Input & Fish): Promise<Output> {
    const fish = new Fish(
      input.commonName,
      input.scientificName,
      input.type,
      input.litersRequired,
      input.picture,
      input.description,
      input.reefSafe,
      input.fishAvoid,
      input.difficulty
    )
    const aquarium = await this.aquariumRepository.get(input.aquariumId)
    aquarium.addFish(fish)

    return {
      fishs: aquarium.getFishs()
    }
  }
}

type Input = {
  aquariumId: number
}

type Output = {
  fishs: Fish[]
}
