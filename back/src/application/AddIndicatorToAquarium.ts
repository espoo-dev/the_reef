import { AddIndicatorToAquariumUseCase } from '@/domain/usecases'
import { badRequest, created, HttpResponse } from './helpers'

type HttpRequest = {
  aquariumId: number
  indicatorId: number
}

type Model = Error | void

export class AddIndicatorToAquarium {
  constructor (private readonly addIndicatorToAquarium: AddIndicatorToAquariumUseCase) {}

  async execute ({ aquariumId, indicatorId }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      await this.addIndicatorToAquarium({ aquariumId, indicatorId })
      return created() 
    } catch (error: any) {
      return badRequest(error)
    }
  }
}
