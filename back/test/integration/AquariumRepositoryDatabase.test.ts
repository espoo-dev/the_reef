import { Aquarium } from '../domain/entity'
import { AquariumRepository } from '../domain/repository'
import { Connection, PgPromiseConnectionAdapter } from '../infra/database'
import { AquariumRepositoryDatabase } from '../infra/repository/database'

let connection: Connection
let aquariumRepository: AquariumRepository

beforeEach(async () => {
  connection = new PgPromiseConnectionAdapter()
  aquariumRepository = new AquariumRepositoryDatabase(connection)
  await aquariumRepository.clean()
})

const saveAquarium = async (name: string) => {
  const aquarium = new Aquarium(1, name)
  await aquariumRepository.save(aquarium)
}

describe('AquariumRepositoryDatabase', () => {
  it('should add a new aquarium in database', async () => {
    await saveAquarium('Iury Reef')
    expect(aquariumRepository.list()).resolves.toHaveLength(1)
  })

  it('should return all aquariums from database', async () => {
    await saveAquarium('Iury Reef')
    const aquariums = await aquariumRepository.list()
    expect(aquariums).toHaveLength(1)
  })

  it('should remove aquarium by id from database', async () => {
    await saveAquarium('Iury Reef')
    const aquariums = await aquariumRepository.list()
    aquariumRepository.remove(aquariums[0].id)
    expect(await aquariumRepository.list()).toHaveLength(0)
  })

  it('should return a aquarium by index', async () => {
    await saveAquarium('Iury Reef')
    const aquariums = await aquariumRepository.list()
    const aquariumFounded = await aquariumRepository.get(aquariums[0].id)
    expect(aquariumFounded.name).toBe('Iury Reef')
  })
})

afterEach(async () => {
  await connection.close()
})
