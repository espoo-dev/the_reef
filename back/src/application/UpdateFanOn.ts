import RepositoryFactory from 'domain/factory/RepositoryFactory'
import { FanRepository } from 'domain/repository'

export class UpdateFanOn {
  fanRepository: FanRepository

  constructor (readonly repositoryFactory: RepositoryFactory) {
    this.fanRepository = repositoryFactory.createFanRepository()
  }

  async execute (input: InputUpdateFanOn): Promise<Output> {
    const fan = await this.fanRepository.get(input.fanId)
    input.on ? fan.turnOn() : fan.turnOff()
    const fanUpdated = await this.fanRepository.updateOn(fan.id, fan.on)

    return {
      fanId: fanUpdated.id,
      on: fanUpdated.on
    }
  }
}

export type InputUpdateFanOn = {
  fanId: number
  on: boolean
}

type Output = {
  fanId: number
  on: boolean
}
