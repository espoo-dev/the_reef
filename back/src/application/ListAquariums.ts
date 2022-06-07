import { Aquarium } from '../domain/entity'
import { ListAquariumsUseCase } from '../domain/usecases'

export class ListAquariumsController {
  constructor (private readonly listAquariums: ListAquariumsUseCase) {}

  async execute (): Promise<Aquarium[]> {
    return await this.listAquariums()
  }
}
