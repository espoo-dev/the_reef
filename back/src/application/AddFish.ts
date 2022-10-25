import { Fish } from '../domain/entity'
import { AquariumRepository } from '../domain/repository'

export class AddFish {
  constructor (private readonly aquariumRepository: AquariumRepository) {}

  async execute (input: Input): Promise<Output> {
    const fish = new Fish(input.name, input.species, input.litersRequired)
    const aquarium = await this.aquariumRepository.get(input.aquariumId)
    aquarium.addFish(fish)

    return {
      fishs: aquarium.getFishs()
    }
  }
}

type Input = {
  aquariumId: number
  name: string
  species: string
  litersRequired: number
}

type Output = {
  fishs: Fish[]
}
