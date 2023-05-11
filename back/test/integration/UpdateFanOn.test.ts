import { UpdateFanOn } from '../../src/application/UpdateFanOn'
import { Fan } from '../../src/domain/entity'
import RepositoryFactory from '../../src/domain/factory/RepositoryFactory'
import { FanRepository } from '../../src/domain/repository'
import { PgPromiseConnectionAdapter } from '../../src/infra/database'
import DatabaseRepositoryFactory from '../../src/infra/factory/DatabaseRepositoryFactory'

const fan = {
  id: 1,
  aquariumId: 1,
  name: 'Temperature',
  on: false
}

let connection = new PgPromiseConnectionAdapter()
let fanRepository: FanRepository
let repositoryFactory: RepositoryFactory

beforeEach(async () => {
  connection = new PgPromiseConnectionAdapter()
  repositoryFactory = new DatabaseRepositoryFactory(connection)
  fanRepository = repositoryFactory.createFanRepository()
  await fanRepository.clean()
})

describe('Toggle value Fan', () => {
  it('should update fan to on', async () => {
    const myTestFan = new Fan(
      fan.id,
      fan.name,
      fan.aquariumId,
    )
    await fanRepository.save(myTestFan)
    const fans = await fanRepository.list()
    const updateFanOn = new UpdateFanOn(repositoryFactory)

    const input = {
      fanId: fans[0].id,
      on: true
    }

    const output = await updateFanOn.execute(input)
    expect(output.on).toBe(input.on)
  })

  it('should update fan to off', async () => {
    const statusFan = true
    const myTestFan = new Fan(
      fan.id,
      fan.name,
      fan.aquariumId,
      statusFan
    )
    await fanRepository.save(myTestFan)
    const fans = await fanRepository.list()
    const updateFanOn = new UpdateFanOn(repositoryFactory)

    const input = {
      fanId: fans[0].id,
      on: false
    }

    const output = await updateFanOn.execute(input)
    expect(output.on).toBe(input.on)
  })
})

afterEach(async () => {
  await connection.close()
})
