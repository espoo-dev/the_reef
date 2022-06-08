import { AddFishUseCase } from '@/domain/usecases'
import { badRequest, created, HttpResponse } from './helpers'

type HttpRequest = {
  aquariumId: number
  name: string
  species: string
  litersRequired: number
}

type Model = Error | void

export class AddFishController {
  constructor (private readonly addFish: AddFishUseCase) {}

  async execute ({ aquariumId, name, species, litersRequired }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      await this.addFish({ aquariumId, name, species, litersRequired })
      return created()
    } catch (error: any) {
      return badRequest(error)
    }
  }
}
