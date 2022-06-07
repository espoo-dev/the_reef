import { AquariumRepository } from '../../domain/contracts/repository'
import { Aquarium } from '../../domain/entity'

type setup = (repository: AquariumRepository) => AddFishUseCase
export type AddFishUseCase = (input: AquariumRepository.Input) => Promise<void>

export const setupAddFish: setup = (repository) => async input => {
  const aquarium = new Aquarium(input.aquariumId, input.name)
  await repository.save(aquarium)
}
