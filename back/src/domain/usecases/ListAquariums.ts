import { AquariumRepository } from '@/domain/contracts/repository'
import { Aquarium } from '../../domain/entity'

type setup = (repository: AquariumRepository) => ListAquariumsUseCase
export type ListAquariumsUseCase = () => Promise<Aquarium[]>

export const setupListAquariums: setup = (repository) => async () => {
  return await repository.list()
}
