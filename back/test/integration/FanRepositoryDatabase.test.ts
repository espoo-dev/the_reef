import { Aquarium, Dimensions, Fan } from '../../src/domain/entity'
import { AquariumRepository, FanRepository } from '../../src/domain/repository'
import { Connection, PgPromiseConnectionAdapter } from '../../src/infra/database'
import { AquariumRepositoryDatabase, FanRepositoryDatabase } from '../../src/infra/repository/database'

let connection: Connection
let fanRepository: FanRepository
let aquariumRepository: AquariumRepository

const fan = {
  id: 1,
  aquariumId: 1,
  name: 'Fan Test',
  on: false
}

beforeEach(async () => {
  connection = new PgPromiseConnectionAdapter()
  fanRepository = new FanRepositoryDatabase(connection)
  aquariumRepository = new AquariumRepositoryDatabase(connection)
  await fanRepository.clean()
})

const saveFan = async (): Promise<void> => {
  const aquarium = new Aquarium(1, 'Reef With Fan', new Dimensions(50, 50, 50))
  await aquariumRepository.save(aquarium)
  const aquariums = await aquariumRepository.list()

  const fanToDB = new Fan(
    fan.id,
    fan.name,
    aquariums[0].id
  )
  await fanRepository.save(fanToDB)
}

describe('FanRepositoryDatabase', () => {
  it('should add a new fan in database', async () => {
    await saveFan()
    const fans = await fanRepository.list()
    expect(fans).toHaveLength(fans.length)
  })

  it('should return all fans from database with correct data', async () => {
    await saveFan()
    const fans = await fanRepository.list()
    fans.forEach(fan => {
      expect(fan.aquariumId).toBe(fan.aquariumId)
      expect(fan.name).toBe(fan.name)
      expect(fan.on).toBe(fan.on)
    })
    expect(fans).toHaveLength(fans.length)
  })

  it('should remove fan by id from database', async () => {
    await saveFan()
    const fans = await fanRepository.list()
    await fanRepository.remove(fans[0].id)
    expect(await fanRepository.list()).toHaveLength(0)
  })

  it('should return a fan by index', async () => {
    await saveFan()
    const fans = await fanRepository.list()
    const fan = await fanRepository.get(fans[0].id)
    expect(fan.name).toBe(fan.name)
    expect(fan.aquariumId).toBe(fan.aquariumId)
    expect(fan.on).toBe(fan.on)
  })
})

afterEach(async () => {
  await connection.close()
})
