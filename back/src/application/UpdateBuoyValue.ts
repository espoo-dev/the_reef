import RepositoryFactory from 'domain/factory/RepositoryFactory'
import { BuoyRepository } from 'domain/repository'

export class UpdateBuoyValue {
  buoyRepository: BuoyRepository

  constructor (readonly repositoryFactory: RepositoryFactory) {
    this.buoyRepository = repositoryFactory.createBuoyRepository()
  }

  async execute (input: UpdateBuoyValue.Input): Promise<UpdateBuoyValue.Output> {
    const buoy = await this.buoyRepository.get(input.buoyId)
    buoy.update(input.newValue)
    const buoyUpdated = await this.buoyRepository.updateValue(buoy.id, buoy.currentValue)

    return {
      buoyId: buoyUpdated.id,
      currentValue: buoyUpdated.currentValue,
      isOn: buoyUpdated.isOn(),
    }
  }
}

export namespace UpdateBuoyValue {
  export type Input = {
    buoyId: number
    newValue: boolean
  }

  export type Output = {
    buoyId: number
    currentValue: boolean
    isOn: boolean
  }
}
