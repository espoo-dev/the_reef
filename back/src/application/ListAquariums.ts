import { Aquarium } from '../domain/entity'
import { ListAquariumsUseCase } from '../domain/usecases'
import { badRequest, HttpResponse, ok } from './helpers'

type Model = Error | Aquarium[] 

export class ListAquariumsController {
  constructor (private readonly listAquariums: ListAquariumsUseCase) {}

  async execute (): Promise<HttpResponse<Model>> {
    try {
      const aquariums = await this.listAquariums()
      return ok(aquariums)
    } catch (error: any) {
      error.message = "Erro ao listar os aquários"
      return badRequest(error)
    }
  }
}
