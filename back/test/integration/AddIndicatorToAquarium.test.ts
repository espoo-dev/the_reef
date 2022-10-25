import { AddIndicatorToAquarium } from '../../src/application'
import { Aquarium, Dimensions, Indicator } from '../../src/domain/entity'
import RepositoryFactory from '../../src/domain/factory/RepositoryFactory'
import { AquariumRepository, IndicatorRepository } from '../../src/domain/repository'
import { PgPromiseConnectionAdapter } from '../../src/infra/database'
import DatabaseRepositoryFactory from '../../src/infra/factory/DatabaseRepositoryFactory'

let connection = new PgPromiseConnectionAdapter()
let aquariumRepository: AquariumRepository
let indicatorRepository: IndicatorRepository
let repositoryFactory: RepositoryFactory

beforeEach(async () => {
  connection = new PgPromiseConnectionAdapter()
  repositoryFactory = new DatabaseRepositoryFactory(connection)

  indicatorRepository = repositoryFactory.createIndicatorRepository()
  aquariumRepository = repositoryFactory.createAquariumRepository()
  await aquariumRepository.clean()
  await indicatorRepository.clean()
})

describe('Add indicator in aquarium', () => {
  it('should add a new indicator to a aquarium', async () => {
    const addIndicatorToAquarium = new AddIndicatorToAquarium(repositoryFactory)
    const aquarium = new Aquarium(1, 'Reef Indicator', new Dimensions(50, 50, 50))
    await aquariumRepository.save(aquarium)

    const aquariums = await aquariumRepository.list()

    const temperatureIndicator = new Indicator(
      1,
      aquariums[0].id,
      'Temperature',
      'celsius',
      'Temperature indicator',
      0, 26, 23, 27
    )

    await indicatorRepository.save(temperatureIndicator)
    const indicators = await indicatorRepository.list()

    const input = {
      aquariumId: aquariums[0].id,
      indicatorId: indicators[0].id
    }

    const output = await addIndicatorToAquarium.execute(input)
    expect(output.indicators).toHaveLength(2)
  })
})

afterEach(async () => {
  await connection.close()
})
